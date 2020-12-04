
// modal--sell
function showModalSell(){
    var showSell = document.querySelectorAll('.header__navbar-item--set')[0];
    var overlay = document.querySelectorAll('.modal__overlay')[1];
    var exitSell = document.querySelector('.exit-sell');
    
    showSell.addEventListener('click',()=>{
        document.querySelector('.modal-sell').style.display = 'flex';
    })
    exitSell.addEventListener('click',()=>{
        document.querySelector('.modal-sell').style.display = 'none';
    })
    overlay.addEventListener('click',()=>{
        document.querySelector('.modal-sell').style.display = 'none';
    })
}


function MoveListProduct(){
    var moveElement = document.querySelector('.btn_option');
    var mainElement = document.querySelector('.body-sell-wrapper');
    
   
    moveElement.addEventListener('click',()=>{
        var size = mainElement.clientWidth;
       
        mainElement.style.transform ='translateX('+ -size +'px)';
        mainElement.style.transition ='all 500ms ease 0s';
    })

    var back = document.querySelector('.btn-add_product');
    back.addEventListener('click',()=>{
        mainElement.style.transform ='translateX('+ 0 +'px)';
        mainElement.style.transition ='all 500ms ease 0s';
        moveElement.innerHTML = 'Tất cả sản phẩm';
        document.getElementById('creat-sell').style.display = 'block';
        document.querySelector('#save-sell').style.display = 'none';
        document.querySelector('input[name="name"]').value='';
        document.querySelector('input[name="oldprice"]').value;
        
        document.querySelector('input[name="address"]').value ;
        document.querySelector('input[name="brand"]').value ;
        document.querySelector('.img-output').src='';
    })
}


function selectCategory(){
    var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
}

// add input
// function addInputConfigs(){
//     var addInputElement = document.querySelector('.add-input-config');
//     var parent = document.querySelector('.config-wrapper');
//     addInputElement.addEventListener('click',()=>{
//         var input = document.createElement('div');
//         input.classList.add('configs-input');
        
//         var deleteElement = document.createElement('div');
//         deleteElement.classList.add('delete-configs');
//         var iconDelete = document.createElement('i');
//         iconDelete.classList.add('fal','fa-trash');
//         deleteElement.appendChild(iconDelete);
      
//         input.appendChild(deleteElement)
        
//         var inputElement = document.createElement('input');
//         inputElement.type = "text";
//         inputElement.className ="input-config";
//         inputElement.placeholder ="Nhập size";
//         input.insertBefore(inputElement,input.children[0]);
       
//         parent.insertBefore(input ,parent.lastElementChild)
        
//         var deleteElements = document.querySelectorAll('.delete-configs');
//         deleteElements.forEach(deleteElement =>{
//             deleteElement.addEventListener('click',(e)=>{
//                 // e.target.parentElement.remove();
//                 e.target.parentElement.parentElement.remove();
              
//             })
//         })
//     })
 
// }
// addInputConfigs();
//* filter 
// btnSort[0].addEventListener('click',(btn)=>{
//     btn.preventDefault();
//     var arrayItems = [];
//     var priceItems = document.querySelectorAll('.price-new');
//     priceItems.forEach(items =>{
//     var item =  items.textContent.replace('.','').replace('.','');
//         arrayItems.push(item)
       
//     })
//    arrayItems.sort(function(a,b){
//         return a- b;
//    });
   
// })


// rate 

function rateHeart(){
    var heartItem = document.querySelector('.rate_heart');
    var displayCount = document.querySelector('.product-rated span');
    var count = parseInt(displayCount.textContent);

heartItem.addEventListener('click',()=>{
     heartItem.children[0].classList.toggle("rated");
     
    if(heartItem.children[0].classList.contains("rated")){
        count ++ ;
        displayCount.innerHTML = count;
    }else{
        count = count-1;
        displayCount.innerHTML = count ;
    }
   
})
}
// rate heart 
function rateHearts(){
  var heartItems = document.querySelectorAll('.heart-item');

heartItems.forEach(function(e){
  e.addEventListener('click',(val)=>{
      val.preventDefault();
      val.stopPropagation();
      e.children[0].classList.toggle('heart_active');
  })
})

}

export {rateHeart,rateHearts,selectCategory,showModalSell,MoveListProduct,};

    







