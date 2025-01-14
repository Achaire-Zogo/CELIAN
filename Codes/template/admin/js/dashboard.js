const hDasboard = document.location.origin + `/e-commerce/admin/fonction/`;

function main()
{
    const url = hDasboard + `stats.php`;

    const client_value = document.getElementById("client-value");
    const commande_value = document.getElementById("commande-value");
    const commande_traitee_value = document.getElementById("commande-traitee-value");
    const produit_value = document.getElementById("produit-value");
    const rev_livraison_value = document.getElementById("rev-livraison-value");
    const rev_commande_value = document.getElementById("rev-commande-value");

    // Utilisation des requêtes AJAX pour modifier les clients
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let datas = JSON.parse(xhr.responseText);
                
                client_value.innerText = datas["clients"];
                commande_value.innerText = datas["commandes"];
                commande_traitee_value.innerText = datas["commandes_traitees"];
                produit_value.innerText = datas["produits"];
                rev_livraison_value.innerText = datas["rev_livraisons"] + "FCFA";
                rev_commande_value.innerText = datas["rev_commandes"] + "FCFA";
            } else {
                // Gérer les erreurs
                console.error("Erreur lors de la récupération des données");
            }
        }
    };
    // Envoyer les données
    xhr.send(); 
}

main();