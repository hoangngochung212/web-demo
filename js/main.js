// * Carousel 

var slideIndex,slides,dots;
function silderContainer(){
    slideIndex = 0;
    slides=document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity=1;
    //disable nextPrevBtn if slide count is one
    if(slides.length<2){
        var nextPrevBtns=document.querySelector(".leftArrow,.rightArrow");
        nextPrevBtns.style.display="none";
        for (i = 0; i < nextPrevBtn.length; i++) {
            nextPrevBtn[i].style.display="none";
        }
    }

    //add dots
    dots=[];
    var dotsContainer=document.getElementById("dotsContainer"),i;
    for (i = 0; i < slides.length; i++) {
        var dot=document.createElement("span");
        dot.classList.add("dots");
        dotsContainer.append(dot);
        dot.setAttribute("onclick","moveSlide("+i+")");
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");
}
silderContainer();
function plusSlides(n) {
    moveSlide(slideIndex+n);
}
var nextBtn = document.querySelector('.rightArrow');
var prevBtn = document.querySelector('.leftArrow');
nextBtn.addEventListener('click',()=>{
    plusSlides(1);
})
prevBtn.addEventListener('click',()=>{
    plusSlides(-1);
})
function moveSlide(n){
    var i;
    var current,next;
    var moveSlideAnimClass={
          forCurrent:"",
          forNext:""
    };
    
    if(n>slideIndex) {
        if(n >= slides.length){n=0;}
        moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
        moveSlideAnimClass.forNext="moveLeftNextSlide";
        
    }else if(n<slideIndex){
        if(n<0){n=slides.length-1;}
        moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
        moveSlideAnimClass.forNext="moveRightPrevSlide";
       
    }

    if(n!=slideIndex){
        next = slides[n];
        current=slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "imageHolder";
            slides[i].style.opacity=0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex=n;

    }

}
var timer=null;
function setTimer(){
    timer=setInterval(function () {
        plusSlides(1) ;
    },3000);
}
var sliders = document.querySelector('.carousel-container');
 sliders.addEventListener("mouseover" , ()=> {
        clearInterval(timer);
    });
 sliders.addEventListener("mouseout" , ()=>{
        setTimer();
 })
setTimer();

// carousel

function ofsCarousel(){

    var nextBtn = document.querySelector('.carousel_btn-next');
    var prevBtn = document.querySelector('.carousel_btn-prev');
    var listItems = document.querySelector('.image-carousel__item-list');
    var itemElement = document.querySelectorAll('.image-carousel__item ');
    var index = 0;
    
    
    nextBtn.addEventListener('click',()=>{
        var size = listItems.clientWidth;
        listItems.style.transform = 'translateX('+ -size +'px)';
        listItems.style.transition ='all 500ms ease 0s';
        nextBtn.style.display = 'none';
        prevBtn.style.display='block';
     
    })
    prevBtn.addEventListener('click',()=>{
        listItems.style.transform = 'translateX('+ 0 +'px)';
        listItems.style.transition ='all 500ms ease 0s';
        nextBtn.style.display = 'block';
        prevBtn.style.display='none';
    })
 
   document.querySelector('.image-carousel__item-list-wrapper').addEventListener('mousemove',()=>{
        nextBtn.style.transform ='scale(2)';
        prevBtn.style.transform ='scale(2)';
   })
   document.querySelector('.image-carousel__item-list-wrapper').addEventListener('mouseout',()=>{
    nextBtn.style.transform ='scale(1)';
    prevBtn.style.transform ='scale(1)';
})
    
   
}
ofsCarousel();

// Login $ resgistration

function loginResgis(){
    
    var resgisItem = document.querySelector('.registration');
    var loginItem = document.querySelector('.login');
    var formLogin = document.querySelector('.form-login');
    var modalElement = document.querySelector('.modal');
    var formResgis = document.querySelector('.form_registration');
    var exitForms = document.querySelectorAll('.form-control-back');
   
    resgisItem.addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formLogin.style.display = 'none';
        formResgis.style.display ='block'
    });

    loginItem.addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formResgis.style.display='none';
        formLogin.style.display ="block"
    })

   
    exitForms.forEach(value =>{
        value.addEventListener('click',()=>{
            modalElement.style.display = 'none';
        })
    })
    document.querySelector('.modal__overlay').addEventListener('click',()=>{
        modalElement.style.display = 'none';
    });

    var switchForm = document.querySelectorAll('.form_switch-btn');
    switchForm[0].addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formResgis.style.display='none';
        formLogin.style.display ="block"
    })
    switchForm[1].addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formLogin.style.display = 'none';
        formResgis.style.display ='block';
    })

}
loginResgis();
// Form validation

//* Đối tượng 
function Validator(options){
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement;
        }
    }
    var selectoRules = {};
 //   hàm validate - thực hiện
    function validate(inputElement,rule){
           
            var errorMessage = rule.test(inputElement.value);
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

            var rules = selectoRules[rule.selector];
            // lặp qua từng rule và kiểm tra
            // nếu có lỗi thì break
            for(var i = 0 ; i < rules.length ; i++){
                switch (inputElement.type){
                    case 'radio':
                    case 'checkbox':
                        errorMessage =  rules[i](formElement.querySelector(
                            rule.selector + ":checked"));
                        break;
                    default:
                        errorMessage =  rules[i](inputElement.value);
                }
                
                if(errorMessage) break;
            }
           if(errorMessage){
               errorElement.innerHTML = errorMessage;
               getParent(inputElement, options.formGroupSelector).classList.add('invalid');
           }else {
               errorElement.innerHTML = '';
               getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
           }
           return   !errorMessage;
    }
    var formElement = document.querySelector(options.form);
    
    if(formElement){
        // Khi submit form
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid =true;
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid  = validate(inputElement,rule)
                if(!isValid){
                    isFormValid = false;
                }
            });
            if(isFormValid){
                // trường hợp submit với js
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var checkElement = undefined;
                    var checkedSelector = '';
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            checkedSelector = input.name;
                    if (input.matches(':checked')) {
                         checkElement = input;
                        if (!Array.isArray(values[input.name])) {
                        values[input.name] = [];
                        }
                        values[input.name].push(input.value);
                        }
                         break;
                        case 'file':
                            values[input.name] = input.files;
                        break;
                            default:
                            values[input.name] = input.value;
                             }
                        return values;
                        }, {});
                         if (!checkElement) {
                             formValues[checkedSelector] = '';
                    
                            }
                    options.onSubmit(formValues);
                    }
                else {
                    // submit mặc định
                    formElement.submit();
                    }
            }
             
        }

        options.rules.forEach(function(rule){
            // lưu lại các rule cho mỗi input
            // selectoRules[rule.selector] = rule.test;
            if(Array.isArray(selectoRules[rule.selector])){
                selectoRules[rule.selector].push(rule.test)
            }else {
                selectoRules[rule.selector] = [rule.test];
            }
            
            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement){
                inputElement.onblur = function(){
                    // var errorMessage ;
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    validate(inputElement,rule);
                // if(errorMessage){
                //        errorElement.innerHTML = errorMessage;
                //        getParent(inputElement, options.formGroupSelector).classList.add('invalid');
                //    }else {
                //        errorElement.innerHTML = '';
                //        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                //    }
                }
                inputElement.oninput = function(){ // khi user nhap
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerHTML = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })
           
        });
       
    }
    
}
// * Định nghĩa rule
// * Nguyen tac rules :
//*1 .Khi co loi => mess loi
//*2 .Khi hop le => undefined   
Validator.isRequired = function(selector,message){
    return {
        selector : selector ,
        test : function(value){
          return value ? undefined : message || 'Vui lòng nhập trường này!'
        }
        
    }
} 
Validator.isEmail = function(selector,message){
      return {
        selector : selector ,
        test : function(value){
            var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var regexPhone = /^\d{10}$/;
            // return regexEmail.test(value) ? undefined : 'truong nay phai la email'
            if(regexEmail.test(value) || regexPhone.test(value)){
                return undefined;
            }else {
               return message ||'Trường này phải là Email !'
            }
        }
    }
} 
Validator.checkPass= function(selector){
    return {
      selector : selector ,
      test : function(value){
    //   var checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    //   if(value.match(checkPassword)){
    //       return undefined
    //   } else {return 'chứa ít nhất 8 ký tự, 1 số, 1 chữ hoa và 1 chữ thường '}
    //   return value.match(checkPassword) ? undefined : 'Mật khẩu phải chứa ít nhất 8 ký tự, và chứa ít nhất hai trong những điều sau đây: chữ viết hoa, chữ viết thường, số và ký hiệu.'
         return value.length >= 6 ? undefined : 'Mật khẩu chứ ít nhất 6 ký tự'
      
  }
}
} 
Validator.isConfirmed = function(selector,getConfirm,message){
    return{
        selector : selector,
        test : function(value){
            return value === getConfirm() ? undefined : message || "Giá trị nhập vào không chính xác,vui lòng nhập lại"

        }
    }
}

// ! Run
Validator({
    form: '.form_registration',
    formGroupSelector : '.form-group',
    errorSelector : '.form-message',
    rules : [
        Validator.isEmail('#email','Email hoặc số điện thoại không hợp lệ'),
        Validator.checkPass('#password',6),
        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation',function(){
          return document.querySelector('.form_registration #password').value;
        }, 'Mật khẩu nhập lại không chính xác'),
    ],
    onSubmit: function(data){
       //call API
        console.log(data);
    }
})



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
showModalSell();

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
MoveListProduct();
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
selectCategory();
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



    


// moblie & tablet

function openNavMobile()
{   var navItems = document.querySelector('.navbar')
    var exitBtn = document.querySelector('.navbar-exit');
    var openBtn = document.querySelector('.mobile_category-open');
    var overlayModal = document.querySelector('.mobile_overlay');
    openBtn.addEventListener('click',()=>{
        navItems.style.opacity = '1';
        navItems.style.transform = 'translateX(0%)';
        overlayModal.style.display ='block'
    })
    exitBtn.addEventListener('click',()=>{
        navItems.style.opacity = '0';
        navItems.style.transform = 'translateX(-100%)';
        overlayModal.style.display ='none'
    })
    overlayModal.addEventListener('click',()=>{
        navItems.style.opacity = '0';
        navItems.style.transform = 'translateX(-100%)';
        overlayModal.style.display ='none'
    })

}
openNavMobile();



