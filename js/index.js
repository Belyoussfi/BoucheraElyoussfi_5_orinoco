const getCameras = async() => {
    donneesApi = await fetch ('http://localhost:3000/api/cameras/')
        .then(function(response){
            if (response.ok){
                return response.json()
            }
        })
        console.log(donneesApi); // Transformation au format json pour lire les données sur la console 
        cameras.innerHTML = (
            donneesApi
            .map(donnee => (
                `
                    <div class="camera-product">
                        <a href="produit.html?id=${donnee._id}"><img class="details-product" src="${donnee.imageUrl}"/></a>
                        <div class="camera-name">
                           <p>Nom de l'article:</p>
                           <h3 class="details-product">${donnee.name}</h3>
                        </div> 
                        <div class="camera-name"> 
                           <p>Prix de l'article:</p>
                           <p class="details-product"><strong>${donnee.price/100} €</strong></p>
                        </div>   
                    </div>
                `
            )).join('')
        )
        console.log(cameras);
}
getCameras();













