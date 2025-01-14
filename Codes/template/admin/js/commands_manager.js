/** Programme JavaScript pour la gestion dynamique des messages de clients  **/

/** Définition de l'url de base pour la conception des requêtes AJAX **/

// Origine  : http://localhost en local
const hCommands = document.location.origin + `/e-commerce/admin/fonction/`;

function createProductCard(product) {
    const container = document.createElement('div');
    container.classList.add('col-xxl-6');
    container.classList.add('col-md-6');

    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `messages-${product.id}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const productName = document.createElement('h5');
    productName.classList.add("card-title");
    productName.innerHTML = `${product.nom_client}(<span style="color: gray; font-style: italic;">${product.email_client}</span>)`;

    const productStatus = document.createElement('p');
    productStatus.classList.add("card-text");
    if(parseInt(product.traitee))
    {
        productStatus.innerHTML = `Status : <span class="text-success" style="color: gray; font-style: italic; font-weight: bold;">Traitée</span><br>`;
    }
    else
    {
        productStatus.innerHTML = `Status : <span class="text-danger" style="color: gray; font-style: italic; font-weight: bold;">Non traitée</span><br>`;
    }

    const productContain = document.createElement('p');
    productContain.classList.add("card-text");
    productContain.innerHTML = `
        Coût Livraison : <span style="color: gray; font-style: italic; font-weight: bold;">${product.cout_livraison} FCFA</span><br>
        Coût Total : <span style="color: gray; font-style: italic; font-weight: bold;">${product.cout_total} FCFA</span><br><br>
        Envoyée le <span style="color: blue; font-weight: bold;">${product.date}</span><br>
    `;

    const productTitle = document.createElement('h5');
    productTitle.classList.add("text-primary");
    productTitle.innerText = "Liste des produits";

    const productList = document.createElement('ul');
    productList.classList.add("list-group");

    let productItem = null;
    for(let i = 0; i < product.produits.length; i++)
    {
        let elt = product.produits[i];

        productItem = document.createElement('li');
        productItem.classList.add("list-group-item");
        productItem.classList.add("d-flex");
        productItem.classList.add("justify-content-between");
        productItem.classList.add("align-items-center");
        productItem.innerHTML =  `
        ${elt.nom}
        <span class="badge bg-primary rounded-pill">${elt.prix} FCFA ( x${elt.quantite} )</span>
        `;

        productList.appendChild(productItem);
    }

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("m-1");
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => {
        // Supprimer le client en envoyant une requête AJAX
        deleteCommand(product.id); // Appel de la fonction deleteClient avec l'identifiant du produit
    });

    const treatBtn = document.createElement('button');
    treatBtn.classList.add("btn");
    treatBtn.classList.add("btn-primary");
    treatBtn.classList.add("m-1");
    treatBtn.textContent = 'Traiter la commande';
    treatBtn.addEventListener('click', () => {
        // Supprimer le client en envoyant une requête AJAX
        treatCommand(product.id); // Appel de la fonction deleteClient avec l'identifiant du produit
    });

    btnContainer.appendChild(deleteBtn);
    if(parseInt(product.traitee) == 0)
        btnContainer.appendChild(treatBtn);

    container.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(productName);
    cardBody.appendChild(productStatus);
    cardBody.appendChild(productContain);
    cardBody.appendChild(productTitle);
    cardBody.appendChild(productList);
    cardBody.appendChild(btnContainer);

    return container;
}

// Fonction pour supprimer un message en envoyant une requête AJAX
function deleteCommand(commandId) {
    const url = hCommands + `commande/supprimer_commande.php`;
    // Envoi d'une requête AJAX pour supprimer le produit
    if(confirm("Etes vous sur de vouloir supprimer cette commande ?"))
    {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Suppression réussie, mettre à jour l'interface utilisateur
                    alert(xhr.responseText);
                    loadCommands();
                } else {
                    // Gérer les erreurs
                    console.error('Erreur lors de la suppression de la commande');
                }
            }
        };
        xhr.send(`command_id=${commandId}`); // Envoyer l'identifiant du produit à supprimer
    }
}

// Fonction pour supprimer un message en envoyant une requête AJAX
function treatCommand(commandId) {
    const url = hCommands + `commande/traiter_commande.php`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Suppression réussie, mettre à jour l'interface utilisateur
                alert(xhr.responseText);
                loadCommands();
            } else {
                // Gérer les erreurs
                console.error('Erreur lors de l\'opération de traitement');
            }
        }
    };
    xhr.send(`command_id=${commandId}`); // Envoyer l'identifiant du produit à supprimer

}

// On charge les messages
function loadCommands(search = false)
{
    if(search)
    {
        productsData = JSON.parse(window.localStorage.getItem("datas"));
        displayCommands(productsData);
    }
    else
    {
        const url = hCommands + `commande/charger_commandes.php`;
    
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Ajout de produit au panier reussi
                    let datas = JSON.parse(xhr.responseText);
                    window.localStorage.setItem("datas", xhr.responseText);
                    displayCommands(datas);
                } else {
                    // Gérer les erreurs
                    console.error("Erreur lors de la mise à jour des commandes");
                }
            }
        };
        xhr.send(); // Envoyer l'identifiant du produit à ajouter au panier
    }
}


function displayCommands(productsData) {
    const productsContainer = document.getElementById('commands-container');

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

    //console.log({"datas" : datas});
    search_box.addEventListener("input", (e) => {
        let datas = JSON.parse(window.localStorage.getItem("datas"));
        let value = search_box.value;
        if(value != "")
        {
            let finalDatas = [];
            for(let i = 0; i < datas.length; i++)
            {
                let eltI = datas[i];
                if(eltI.nom_client.toLowerCase().includes(value.toLowerCase()) ||
                    eltI.email_client.toLowerCase().includes(value.toLowerCase()))
                {
                    finalDatas.push(eltI);
                }
                else
                {
                    for(let j = 0; j < eltI.produits.length; j++)
                    {
                        let eltJ = eltI.produits[j];

                        if(eltJ.nom.toLowerCase().includes(value.toLowerCase()) ||
                            eltJ.prix.toLowerCase().includes(value.toLowerCase()) ||
                            eltJ.quantite.toLowerCase().includes(value.toLowerCase()))
                        {
                            finalDatas.push(eltI);
                            break;
                        }
                    }
                }

            }
            window.localStorage.setItem("datas", JSON.stringify(finalDatas));
            loadCommands(true);
        }
        else
        {
            loadCommands();
        }
    });
}

// Appels de fonction
loadCommands();
search();