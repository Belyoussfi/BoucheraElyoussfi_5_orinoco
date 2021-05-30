// Déclaration de la variable "produitEnregistreDansLocalStorage" dans lequel on met la clé dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("camera"));
// Conversion des données dans le local storage au format json en format javascript
//console.log(produitEnregistreDansLocalStorage);

// L'affichage des caméras sur la page panier
// injection du code html dans la classe que je vais sélectionner
const cameraPanier = document.querySelector("#panier");
console.log(cameraPanier);

let produitCameraPanier = [];
// si le panier est vide
if(produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0){
    const panierVide = `
        <div class="panier">
            <div class="panier-vide">Votre panier est vide</div>
        </div>    
    `;
    cameraPanier.innerHTML = panierVide;
    }else{ // si le panier n'est pas vide, afficher les produits dans le local storage
        for(k = 0; k < produitEnregistreDansLocalStorage.length; k++){
            produitCameraPanier = produitCameraPanier + `
            <div class="contenu">
                <div>
                    <img src ='${produitEnregistreDansLocalStorage[k].imageUrl}' />
                </div>    
                <div class="name">Quantité 1 - ${produitEnregistreDansLocalStorage[k].name}</div>
                <div><strong>${produitEnregistreDansLocalStorage[k].price} €</strong></div>
                <button id="delete"> Supprimer article</button>
            </div>
            `;
        }
        if(k == produitEnregistreDansLocalStorage.length){
            cameraPanier.innerHTML = produitCameraPanier;
        }
    }
    let btn_supression = document.querySelectorAll("#delete");

    for (let l = 0; l < btn_supression.length; l++) {
        btn_supression[l].addEventListener('click', (event) => {
            event.preventDefault();
            
            // Sélection du nom de la caméra qui sera supprimée lors du clic 
            let nameSuppression = produitEnregistreDansLocalStorage[l].id;

            // Avec la méthode filter, je supprime la caméra que je veux en cliquant sur "Supprimer article"
            produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter(element => element.id !== nameSuppression);
            console.log(produitEnregistreDansLocalStorage);
            // La variable est envoyee dans le local storage
            localStorage.setItem("camera", JSON.stringify(produitEnregistreDansLocalStorage));
            alert("Cette caméra a été supprimée de votre panier, cliquez sur OK");
            window.location.href= "panier.html";
        })
    }
