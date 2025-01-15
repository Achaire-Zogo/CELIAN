/** Programme JavaScript pour la gestion dynamique des articles  **/

/** Définition de l'url de base pour la conception des requêtes AJAX **/

// Origine  : http://localhost en local
const hArticles = document.location.origin + `/e-commerce/admin/fonction/`;

// Récupérationdes élements du DOM 
const startAdd = document.getElementById("start-add");
const endAdd = document.getElementById("end-add");

const addBtn = document.getElementById("add-btn");

const startEdit = document.getElementsByClassName("start-edit");
const endEdit = document.getElementById("end-edit");

const editForm = document.getElementById("edit-form");
const addForm = document.getElementById("add-form");

const editRow = document.getElementById("edit-row");
const addRow = document.getElementById("add-row");

// Fonction pour créer une carte produit
function createProductCard(product) {
    const container = document.createElement('div');
    container.classList.add('col-xxl-4');
    container.classList.add('col-md-4');

    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `produit-${product.id}`;

    const productImage = document.createElement('img');
    productImage.classList.add("card-img-top");
    productImage.style.height = "300px";
    productImage.src = product.image_url;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const productName = document.createElement('h5');
    productName.classList.add("card-title");
    productName.textContent = product.nom;

    const productDescription = document.createElement('p');
    productDescription.classList.add("card-text");
    productDescription.textContent = product.description;

    const productPrice = document.createElement('p');
    productPrice.classList.add("card-text");
    productPrice.style.color = "gray";
    productPrice.textContent = product.prix + "FCFA";

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("m-1");
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => {
        // Supprimer l'article en envoyant une requête AJAX
        deleteArticle(product); // Appel de la fonction deleteArticle avec l'identifiant du produit
    });

    const editBtn = document.createElement('button');
    editBtn.classList.add('start-edit');
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-primary");
    editBtn.classList.add("m-1");
    editBtn.textContent = 'Modifier';
    editBtn.addEventListener('click', () => {
        // Ajoutez ici la logique pour modifier le article
        ShowEditRow(product);
        const editRow = document.getElementById("edit-row");
        editRow.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    container.appendChild(card);
    card.appendChild(productImage);
    card.appendChild(cardBody);
    cardBody.appendChild(productName);
    cardBody.appendChild(productDescription);
    cardBody.appendChild(productPrice);
    cardBody.appendChild(btnContainer);

    return container;
}

// Fonction qui permet d'ajouter des articles dans la bd
function addArticles()
{
    const url = hArticles + `article/ajouter_article.php`;

    const form = document.getElementById("add-form");
    var fd = new FormData(form);

    // Utilisation des requêtes AJAX pour modifier les articles
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Ajout réussie, mettre à jour l'interface utilisateur
                alert(xhr.responseText);
                addRow.style.display = "none";
                loadArticles();
            } else {
                // Gérer les erreurs
                console.error("Erreur lors de l'ajout de l'article");
            }
        }
    };
    // Envoyer les données de l'article à ajouter
    xhr.send(fd); 
}

// Fonction qui permet de modifier les cartes des articles
function editArticle(product)
{
    const url = hArticles + `article/modifier_article.php`;

    const form = document.getElementById("edit-form");
    var fd = new FormData(form);

    fd.append("current_image", product.image_url);
    fd.append("id", product.id);

    // Utilisation des requêtes AJAX pour modifier les articles
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Suppression réussie, mettre à jour l'interface utilisateur
                alert(xhr.responseText);
                loadArticles();
            } else {
                // Gérer les erreurs
                console.error("Erreur lors de la modification de l'article");
            }
        }
    };
    xhr.send(fd); // Envoyer l'identifiant du produit à supprimer

}

// Fonction pour supprimer un article en envoyant une requête AJAX
function deleteArticle(product) {
    const url = hArticles + `article/supprimer_article.php`;
    // Envoi d'une requête AJAX pour supprimer le produit
    if(confirm("Etes vous sur de vouloir supprimer cet article ?"))
    {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Suppression réussie, mettre à jour l'interface utilisateur
                    alert(xhr.responseText);
                    loadArticles();
                } else {
                    // Gérer les erreurs
                    console.error('Erreur lors de la suppression de l\'article');
                }
            }
        };
        xhr.send(`id=${product.id}`); // Envoyer l'identifiant du produit à supprimer
    }
}

// Fonction qui charge dynamiquement les articles de la BD via un fichier php
function loadArticles(search = false)
{
    if(search)
    {
        productsData = JSON.parse(window.localStorage.getItem("datas"));
        displayArticles(productsData);
    }
    else
    {
        // Url pour le chargement des articles
        const url = hArticles + `article/charger_articles.php`;
    
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
                        displayArticles(productsData);
    
                    }
                    else
                    {
                        alert('Aucun article trouvé.');
                    }
                } else {
                    // Gérer les erreurs
                    console.error('Erreur lors de la récupération des articles');
                }
            }
        };
        xhr.send();
    }
 }

// Fonction pour afficher les produits
function displayArticles(productsData) {
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

// On masque les formulaires au chargement de la page
editRow.style.display = "none";
addRow.style.display = "none";

// Fontion qui permet d'afficher le formulaire d'edition des articles
function ShowEditRow(product)
{
    editRow.style.display = "flex";
    const nom = document.getElementById("edit-form-name");
    const description = document.getElementById("edit-form-description");
    const prix = document.getElementById("edit-form-price");
    const quantite = document.getElementById("edit-form-qty");
    const image = document.getElementById("edit-form-img");
    const img_box = document.getElementById("article-rec");

    nom.value = product.nom;
    description.value = product.description;
    prix.value = product.prix;
    quantite.value = product.quantite_stock;
    img_box.src = product.image_url;

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        editArticle(product);

        editRow.style.display = "none";
    });
}

//Charger l'image après la selection
function onImageInputChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const image = e.target.result;
        document.querySelector("#article-view").src = image;
        document.querySelector("#article-view").style.height = "200px";
    };
    reader.readAsDataURL(file);
}

function onImageUpdateChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const image = e.target.result;
        document.querySelector("#article-rec").src = image;
        document.querySelector("#article-rec").style.height = "200px";
    };
    reader.readAsDataURL(file);
}


// Fonction de recherche
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
                if(elt.description.toLowerCase().includes(value.toLowerCase()) ||
                    elt.nom.toLowerCase().includes(value.toLowerCase()) ||
                    elt.prix.toLowerCase().includes(value.toLowerCase()))
                {
                    finalDatas.push(datas[i]);
                }
            }
            window.localStorage.setItem("datas", JSON.stringify(finalDatas));
            loadArticles(true);
        }
        else
        {
            loadArticles();
        }
    });
}

// Evenement lorsque la valeur de input file change
document.getElementById("add-form-img").addEventListener("change", onImageInputChange);
document.getElementById("edit-form-img").addEventListener("change", onImageUpdateChange);

// Ajout des évènements permettant de masquer le formulaire de modification
endEdit.addEventListener("click", (e) => {
    e.preventDefault();
    editRow.style.display = "none";
});

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
    addArticles();

});
//On charge les article au chargement de la page
loadArticles();
search();