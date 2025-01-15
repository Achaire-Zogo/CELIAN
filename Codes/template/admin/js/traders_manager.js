/** Programme JavaScript pour la gestion dynamique des vendeurs  **/

/** Définition de l'url de base pour la conception des requêtes AJAX **/

// Origine  : http://localhost en local
const hTraders = document.location.origin + `/e-commerce/admin/fonction/`;

// Récupérationdes élements du DOM 
const startAdd = document.getElementById("start-add");
const endAdd = document.getElementById("end-add");

const addBtn = document.getElementById("add-btn");

const addForm = document.getElementById("add-form");

const addRow = document.getElementById("add-row");

// Fonction pour créer une carte produit
function createProductCard(product) {
    const container = document.createElement('div');
    container.classList.add('col-xxl-4');
    container.classList.add('col-md-4');

    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `trader-${product.id}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const productName = document.createElement('h5');
    productName.classList.add("card-title");
    productName.textContent = product.nom;

    const productEmail = document.createElement('p');
    productEmail.classList.add("card-text");
    productEmail.textContent = product.email;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("m-1");
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => {
        // Supprimer le vendeur en envoyant une requête AJAX
        deleteTrader(product); // Appel de la fonction deleteTrader avec l'identifiant du produit
    });

    btnContainer.appendChild(deleteBtn);

    container.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(productName);
    cardBody.appendChild(productEmail);
    cardBody.appendChild(btnContainer);

    return container;
}

// Fonction qui permet d'ajouter des vendeurs dans la bd
function addTraders()
{
    const url = hTraders + `vendeur/ajouter_vendeur.php`;

    const form = document.getElementById("add-form");
    var fd = new FormData(form);

    // Utilisation des requêtes AJAX pour modifier les vendeurs
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Ajout réussie, mettre à jour l'interface utilisateur
                alert(xhr.responseText);
                addRow.style.display = "none";
                loadTraders();
            } else {
                // Gérer les erreurs
                console.error("Erreur lors de l'ajout du vendeur");
            }
        }
    };
    // Envoyer les données du vendeur à ajouter
    xhr.send(fd); 
}

// Fonction pour supprimer un vendeur en envoyant une requête AJAX
function deleteTrader(product) {
    const url = hTraders + `vendeur/supprimer_vendeur.php`;
    // Envoi d'une requête AJAX pour supprimer le produit
    if(confirm("Etes vous sur de vouloir supprimer cet vendeur ?"))
    {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Suppression réussie, mettre à jour l'interface utilisateur
                    alert(xhr.responseText);
                    loadTraders();
                } else {
                    // Gérer les erreurs
                    console.error('Erreur lors de la suppression du vendeur');
                }
            }
        };
        xhr.send(`id=${product.id}`); // Envoyer l'identifiant du produit à supprimer
    }
}

// Fonction qui charge dynamiquement les vendeurs de la BD via un fichier php
function loadTraders(search = false)
{
    if(search)
    {
        productsData = JSON.parse(window.localStorage.getItem("datas"));
        displayTraders(productsData);
    }
    else
    {
        // Url pour le chargement des vendeurs
        const url = hTraders + `vendeur/charger_vendeurs.php`;
    
        // Requête AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // On vérifie si des données sont renvoyées sinon on affiche un message d'erreur
                    let productsData;
                    if(xhr.responseText)
                    {
                        productsData = JSON.parse(xhr.responseText);
                        window.localStorage.setItem("datas", xhr.responseText);
                        displayTraders(productsData);
                    }
                    else
                    {
                        alert('Aucun vendeur trouvé.');
                    }
                } else {
                    // Gérer les erreurs
                    console.error('Erreur lors de la récupération des vendeurs');
                }
            }
        };
        xhr.send();
    }
 }

// Fonction pour afficher les produits
function displayTraders(productsData) {
    const productsContainer = document.getElementById('products-container');

    // On supprime d'abord toutes les cartes du conteneur
    while(productsContainer.firstChild)
    {
        productsContainer.removeChild(productsContainer.firstChild);
    }

    // Créer une carte pour chaque produit et l'ajouter au conteneur
    productsData.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

function search()
{
    let search_box = document.getElementById("search-box");

    //console.log({"datas" : datas[0]});
    search_box.addEventListener("input", (e) => {
        let datas = JSON.parse(window.localStorage.getItem("datas"));
        let value = search_box.value;
        if(value != "")
        {
            let finalDatas = [];
            for(let i = 0; i < datas.length; i++)
            {
                let elt = datas[i];
                if(elt.nom.toLowerCase().includes(value.toLowerCase()) ||
                    elt.email.toLowerCase().includes(value.toLowerCase()))
                {
                    finalDatas.push(datas[i]);
                }
            }
            window.localStorage.setItem("datas", JSON.stringify(finalDatas));
            loadTraders(true);
        }
        else
        {
            loadTraders();
        }
    });
}

// On masque les formulaires au chargement de la page
addRow.style.display = "none";

// Ajout des évènements permettant d'afficher et masquer le formulaire d'ajout'
startAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addRow.style.display = "flex";
});

endAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addRow.style.display = "none";
});

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTraders();

});
//On charge les vendeur au chargement de la page
loadTraders();
search();