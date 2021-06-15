

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
                <div class="panier-name">Quantité 1<br>${produitEnregistreDansLocalStorage[k].name}</div>
                <div><strong>${produitEnregistreDansLocalStorage[k].price} €</strong></div>
                <button id="delete"> Supprimer article</button>
            </div>
            `;
        }

        if(k == produitEnregistreDansLocalStorage.length && produitCameraPanier){
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
    // Afficher le montant total du panier
    // La variable pour mettre les prix qui sont dans le panier
    let montantTotalPanier = [];
    //Récupérer les prix dans le panier à l'aide d'une boucle for
    for(let m = 0; m < produitEnregistreDansLocalStorage.length; m++){
        let prixCameraPanier = produitEnregistreDansLocalStorage[m].price;
        // Mettre le prix des cameras dans la variable montantTotalPanier
        montantTotalPanier.push(prixCameraPanier)
    }
    //Additionner les prix dans la variable "montantTotalPanier"
    const reducer = (accumulator, montantTotal) => accumulator + montantTotal;
    const prixTotal = montantTotalPanier.reduce(reducer,0); 
    console.log(prixTotal);
    
    // Code HTML pour afficher le prixTotal
    const affichagePrixTotal = `
    <div class="prix-total"><br>Le montant total de votre panier est de: ${prixTotal} €</div>
    `
    cameraPanier.insertAdjacentHTML("beforeend", affichagePrixTotal);
    console.log(affichagePrixTotal);

    // Formulaire de Commande

    const afficherFormulaireHtml = () => {
        // Sléction de l'élément du DOM pour la position du formulaire
        const structureFormulaire = document.querySelector("#panier");
        const formulaireHtml = `
            <div id="formulaire-commande">
                <h2>Valider la commande en remplissant le formulaire</h2>
                <form method="#" action= "#"  name="validation" >
                    <label for="nom">Nom* :</label>
                    <input type="text" id ="nom"  name="nom" >
            
                    <label for="prénom">Prénom* :</label>
                    <input type="text" id ="prenom" name="prenom" >
            
                    <label for="email">E-mail* :</label>
                    <input type="text" id="email" name="email" >

                    <label for="adresse">Adresse* :</label>
                    <input id ="adresse" name="adresse" maxlength = 50 ></input>

                    <label for="ville">Ville* :</label>
                    <input type="text" id="ville" name="ville" >

                    <p style="color:red;" id="erreur"></p>
            
                    <button type="submit" id="envoyerCommande" class="envoyer-commande">Valider votre commande</button>
                </form>
            </div>    
        `;
        structureFormulaire.insertAdjacentHTML("afterend", formulaireHtml);
    };
    // Appel de la fonction
    afficherFormulaireHtml();

    // Gestion du formulaire
    const btnValidationFormulaire = document.querySelector("#envoyerCommande");

    btnValidationFormulaire.addEventListener("click", function (event) {
        event.preventDefault();
        const validationFormulaire = true;
        let erreur;
        const inputs = document.getElementsByTagName("input");

        // Boucle pour remplir tous les champs du formulaire
        for(let n = 0; n < inputs.length; n++){
            if(!inputs[n].value) {
                erreur = "Veuillez compléter tous les champs du formulaire";
                break;
            }
        };

        // Message d'erreur si le formulaire n'est pas rempli dans la totalité
        if (erreur){
            document.querySelector("#erreur").innerHTML = erreur;
        };

        // Gestion des RegEx selon les différentes values du formulaire: Ex: pas de chiffres dans la ville
        nom = validation.nom.value;
        regExpNom = /^[a-zA-Z\s]{3,10}$/;
        if(regExpNom.test(nom)==false){
            alert("NOM: Seuls les lettres en majuscules et minuscules sont acceptées. 3 caractères minimum");
            return false;
        }
        // RegEx pour le champ prenom
        prenom = validation.prenom.value;
        regExPrenom = /^[a-zA-Z\s]{3,10}$/;
        if(regExPrenom.test(prenom) ==false){
            alert("PRENOM: Les caractères spéciaux et les chiffres ne sont pas acceptés.");
            return false;
        }
        // RegEx pour le champ email
        email = validation.email.value;
        regExMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(regExMail.test(email) ==false){
            alert("EMAIL: Les caractères @ et . sont obligatoires.");
            return false;
        }
        // RegEx du champ adresse
        adresse = validation.adresse.value;
        regExAdresse = /^[a-zA-Z0-9\s]{5,25}$/;
        if(regExAdresse.test(adresse) ==false){
            alert("ADRESSSE: Minimum de 5 caractères demandés.");
            return false;
        }
        // RegEx du champ ville
        ville = validation.ville.value;
        regExVille = /^[a-zA-Z\s]{5,15}$/;
        if(regExVille.test(ville) ==false){
            alert("VILLE: Les chiffres ne sont pas autorisés. Minimum 5 caractères.");
            return false;
        }

        if(validationFormulaire) { // Si c'est valide envoyer le formulaire
            alert("formulaire envoyé");
        }else{
            e.preventDefault();
            alert("formulaire non envoyé");
        }

        formulaireValues = {
            nom: document.querySelector("#nom").value,
            prenom: document.querySelector("#prenom").value,
            email: document.querySelector("#email").value,
            adresse: document.querySelector("#adresse").value,
            ville: document.querySelector("#ville").value,
        }

        const donneesEnvoyees = {
            formulaireValues,
            produitEnregistreDansLocalStorage,
        };
        
        /*fetch("http://localhost:3000/api/cameras/order", {         
            method: "POST",            
            body: JSON.stringify(donneesEnvoyees),            
            headers: {               
                "Content-type": "application/json"         
            }       
        })       
        .then(window.location.href = "confirmation.html")      
        .then(json.ok = console.log(json))    
        .catch(err => console.log(err)); 
        */
       /* fetch("http://localhost:3000/api/cameras/order", {
        method: 'post',
        body: '',
        headers: {
            'Content-Type': 'application/json'
          },
    
      }).then(function(response) {
        //return response.json();
        console.log(response)
      }).then(function(data) {
        console.log(data)
      });
      */

      /*let fd = new FormData();
        let {user} = this.state.user;
        for (let prop in user) {
        fd.append(prop, JSON.stringify(user[prop]));
     }
     */

      
     let json = JSON.stringify(donneesEnvoyees);

     fetch ("http://localhost:3000/api/cameras/order", {         
        method: "POST",            
        body: json,            
        headers: {               
            "Content-type": "application/json"         
        }       
    })        
     .then(function(response){
         if (response.ok){
            return response.json()
        }
     })
     .then (function(data){
         console.log(data)
     });
    
    


        
       
    
        
    });

   
    
  

    
    

