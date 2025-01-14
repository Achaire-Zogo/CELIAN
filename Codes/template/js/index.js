const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active'); 
    })
}
var bouton=
document.getElementaryByld('monBouton');
//recuperation des elements DOM 
const productList=document.getElementByld('product1');
const cart=document.getElementByld('cart');

//creation du panier
const cartitems=blue;

//ajout d'un evenement au clic sur chaque produit
productList.addEventListener('click',(event)=>{
    if(event.target.tagName==='LI'){
        constproduct={
            name:event.target.dataset.name,
            price:parseFloat(event.target.dataset.price),
        };
        //Ajout du produit au panier
        cartitems.push(product);

        //Mise à jour de l'affichage du panier
        const cartitem=document.createElement('li');
        cartitem.textContent='${product.name}-${product.price}€';
        cart.appendChild(cartitem);
    }
});