// Récupération de la chaine de requête dans l'URL 
// Objectif: Afficher le bon produit (caméra) via l'Id correspondant
const queryUrlId = window.location.search;
console.log(queryUrlId);

// Récupérer seul l'id sans le ?
const urlSearchParams = new URLSearchParams(queryUrlId);
console.log(urlSearchParams);

const _id = urlSearchParams.get("id");
console.log(_id);

// Affichage (sur la console) de la fiche produit (caméra) sélectionnée dans la page d'accueil par l'id
const affichageCamera =  fetch ('http://localhost:3000/api/cameras/')
.then(function(response){
    if (response.ok){
        return response.json()
    }
})
.then (function(data){
    console.log(data)
    // Ciblage de la caméra choisie sur la page d'accueil par l'id 
    const idCameraSelectionnee = data.find((produitCamera) => produitCamera._id === _id); 
    console.log(idCameraSelectionnee); // état invisible sur la page web, résultat cf console.
    // Construction du code pour l'affichage de la fiche produit
    const structureCamera = `
        <div class="container">
            <div class="camera-photo">
                <img src='${idCameraSelectionnee.imageUrl}'/>
            </div> 
            <div class="info-camera">
                <div class="description">
                    <p><strong>Nom de la Caméra</strong>: ${idCameraSelectionnee.name}</p>
                    <p><strong>Description de la Caméra</strong>: ${idCameraSelectionnee.description}</p>
                    <p><strong>Prix de la Caméra</strong>: ${idCameraSelectionnee.price/100}€</p>
                </div>
                <form>
                    <label for="choix-lentilles"><strong>Lentilles:</strong></label>
                    <select name ="choix-lentille" id="lenses">
                        <!--Apparition du nombre des quantités en fonction des lentilles disponibles pour chaque produit-->
                    </select>   
                </form>   
                <button id="btn" type="submit" name="btn_panier"><strong>Ajouter au Panier</strong></button>
            </div>    
        </div>
    `
    // Adapter le nombre de choix des lentilles en fonction du nombre de lentilles disponibles
    const quantiteLentilles = idCameraSelectionnee.lenses;
    // boucle for pour afficher toutes les lentilles disponibles
    let nombreLentilles = [];
    for (let j = 0; j < quantiteLentilles.length; j++){
        nombreLentilles = nombreLentilles +
        `
            <option value="${j}">${quantiteLentilles[j]}</option>
           
        `
    }

    // Récupération de la classe pour mettre mon code HTML à l'intérieur
    const ficheProduit = document.getElementById('PageProduit');
    ficheProduit.innerHTML = structureCamera; // Pour l'affichage du produit final

    // Pour déterminer le nombre de choix de la lentille souhaitée
    const choixLentille = document.querySelector("#lenses");
    choixLentille.innerHTML = nombreLentilles; // OK bien inséré dans le code HTML

    // Ecouter le bouton "Ajouter au panier" + envoyer les infos souhaitées vers le panier
    const btnPanier = document.getElementById('btn')
    btnPanier.addEventListener('click', (event)=>{
        event.preventDefault();
        // Informations qui figureront sur la page du panier
        let detailsPanier = {
            name: idCameraSelectionnee.name,
            quantité:1,
            prix: idCameraSelectionnee.price/100,
        }
        console.log(detailsPanier);
    });
})






