/** Programme JavaScript pour la gestion dynamique des messages de clients  **/

/** Définition de l'url de base pour la conception des requêtes AJAX **/

// Origine  : http://localhost en local
const hMessages = document.location.origin + `/e-commerce/admin/fonction/`;

function createProductCard(product) {
    const container = document.createElement('div');
    container.classList.add('col-xxl-4');
    container.classList.add('col-md-4');

    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `messages-${product.id}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const productName = document.createElement('h5');
    productName.classList.add("card-title");
    productName.innerHTML = `${product.nom}(<span style="color: gray; font-style: italic;">${product.email}</span>)`;

    const productContain = document.createElement('p');
    productContain.classList.add("card-text");
    productContain.textContent = product.message;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("m-1");
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => {
        // Supprimer le client en envoyant une requête AJAX
        deleteMessage(product.id); // Appel de la fonction deleteClient avec l'identifiant du produit
    });

    btnContainer.appendChild(deleteBtn);

    container.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(productName);
    cardBody.appendChild(productContain);
    cardBody.appendChild(btnContainer);

    return container;
}

// Fonction pour supprimer un message en envoyant une requête AJAX
function deleteMessage(messageId) {
    const url = hMessages + `message/supprimer_message.php`;
    // Envoi d'une requête AJAX pour supprimer le produit
    if(confirm("Etes vous sur de vouloir supprimer ce message ?"))
    {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Suppression réussie, mettre à jour l'interface utilisateur
                    alert(xhr.responseText);
                    loadMessageNb();
                    loadMessages();
                } else {
                    // Gérer les erreurs
                    console.error('Erreur lors de la suppression du message');
                }
            }
        };
        xhr.send(`id=${messageId}`); // Envoyer l'identifiant du produit à supprimer
    }
}

// Fontion pour mettre le nombre de messages
function loadMessageNb()
{
    const url = hMessages + `message/charger_messages.php`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Ajout de produit au panier reussi
                let datas = JSON.parse(xhr.responseText);
                let size = datas.length;

                let badge = document.getElementById("message-nb");
                let cnt = document.getElementById("message-nb2");
                badge.innerText = size;
                cnt.innerText = size;
            } else {
                // Gérer les erreurs
                console.error("Erreur lors de la mise à jour du nombre de messages");
            }
        }
    };
    xhr.send(); // Envoyer l'identifiant du produit à ajouter au panier
}

// On charge les messages
function loadMessages()
{
    const url = hMessages + `message/charger_messages.php`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Ajout de produit au panier reussi
                let datas = JSON.parse(xhr.responseText);
                displayMessages(datas);
            } else {
                // Gérer les erreurs
                console.error("Erreur lors de la récupération des messages");
            }
        }
    };
    xhr.send(); // Envoyer l'identifiant du produit à ajouter au panier
}


function displayMessages(productsData) {
    const productsContainer = document.getElementById('messages-container');

    if(productsContainer !== null)
    {
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

}

// Appels de fonction
loadMessageNb();
loadMessages();