function sortCart(dir){
    var cart = document.querySelector('.home-product').children[0];
    var product = cart.querySelectorAll('.col');
  
    var arr = Array.from(product).map(element => ({
        element :element,
        price : parseFloat(element.querySelector('.price-new').textContent.replace('₫','').replaceAll('.',''))
    }));
   
    var sorted = arr.sort((a,b)=>(a.price - b.price) *dir);
  
    sorted.forEach(value =>{
          cart.appendChild(value.element);
    });
}

function runSortCart(){
    var btnSort = document.querySelectorAll('.select-with-status_link');
btnSort[0].addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.select-with-status_label').textContent = btnSort[0].textContent ;
    var dir = btnSort[0].dataset.dir;
    sortCart(dir);
    
});
btnSort[1].addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.select-with-status_label').textContent =btnSort[1].textContent ;
    var dir = btnSort[1].dataset.dir;
    sortCart(dir);
    
})
}
export default runSortCart;