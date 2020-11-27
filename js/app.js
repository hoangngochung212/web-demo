
// carousel img
function carouselImg() {
    var carousel = document.querySelector(".carousel-img");
    var imgItems = document.querySelectorAll(".item img");
    var btnNext = document.querySelector('.next');
    var btnPrev = document.querySelector('.prev');

    var index = 0;
if(imgItems[0])
{
    var size = imgItems[0].clientWidth;
}
    btnNext.addEventListener('click',()=>{
        if(index < imgItems.length -5){
        index++; 
        } else {
        index ===0;
        }
        carousel.style.transition = "transform 0.4s";
   
        carousel.style.transform = 'translateX('+ ((-size-10) * index )  +'px)';
})
    btnPrev.addEventListener('click',()=>{
        
        if(index === 0){
            index = 0;
        } else {
            index --;
        }
        carousel.style.transition = "transform 0.4s";
        carousel.style.transform = 'translateX('+ (-size * index) +'px)';
})

}

function moveImg(){
    var imgElement = document.querySelectorAll('.item');
    var item = document.createElement('div');
    item.setAttribute('class','items');
    imgElement.forEach(function(value){
        value.addEventListener('mousemove',()=>{
            value.appendChild(item);
        })
    })
}
function showImg(){
    var showImg = document.querySelector('.img-show');
    var imgItems = document.querySelectorAll('.item');

  imgItems.forEach(function(element){
      element.addEventListener('mouseover',(value)=>{
        if(value.target.parentElement.classList.contains('item')){
            var imgSrc = value.target.src;
            if(imgSrc){
                var posItem =imgSrc.indexOf('img') + 3 ;
                var partItem = imgSrc.slice(posItem);
                var newItem = {};
                newItem.img = `img${partItem}`;
                showImg.innerHTML = ` <img src="${newItem.img}" alt="">`;
            }
        }
      })
  });
  moveImg();
}



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
//color,status

function statusCart() {
    var btnStt = document.querySelectorAll('.status-variation');
        btnStt.forEach(element =>{
        element.addEventListener("click",(value)=>{
            // product-variation__tick
            if(document.querySelector('.variation-selected')){
                document.querySelector('.variation-selected').classList.remove('variation-selected');
           } 
           value.target.classList.toggle('variation-selected');
           if(document.querySelector('.product-variation__tick')!== null){
               document.querySelector('.product-variation__tick').classList.remove('product-variation__tick');
           }
           value.target.children[0].classList.toggle('product-variation__tick')
        });
    })
    var sttCategory = document.querySelectorAll('.status-category');
        sttCategory.forEach(element =>{
            element.addEventListener('click',(value)=>{
                if(document.querySelector('.category-selected')){
                    document.querySelector('.category-selected').classList.remove('category-selected');
               } 
               value.target.classList.add('category-selected');
               if(document.querySelector('.category-tick')!== null){
                   document.querySelector('.category-tick').classList.remove('category-tick');
               }
               value.target.children[0].classList.add('category-tick')
            })
        })
}

// count
function countProduct(){
    var inputCount = document.querySelector('.amount-value');
    var nextCount = document.querySelector(".next-count");
    var prevCount =document.querySelector('.prev-count');
    var count = parseInt(inputCount.value);

    nextCount.addEventListener('click',()=>{
       count++;
       inputCount.value = count
    })
    prevCount.addEventListener('click',()=>{
        if(count === 1){
            count = 1;
        }else{count--}
        inputCount.value = count;
     })

}

// add to cart 
function addcart(){
    var items = {};
    var addCart = document.querySelector('.add-cart');
    addCart.addEventListener('click',(element) =>{

        if(element.target.classList.contains('category-selected') )
        {   
             items.classify = element.target.innerText;
            
        } 

        if(element.target.classList.contains('variation-selected') )
        {   
             items.classify2 = element.target.innerText; 
             
        } 

        if(element.target.classList.contains('category-selected') || element.target.classList.contains('variation-selected') ){
            element.target.parentElement.parentElement.parentElement.parentElement.classList.remove('notify_active')
            document.querySelector(".notifi_plz").style.display = 'none';
        }
       if(element.target.classList.contains('btn-addcart') ){
         
           
            if(document.querySelector('.category-selected')==null && document.querySelector('.variation-selected')==null)
            {   
                element.target.parentElement.parentElement.parentElement.previousElementSibling.children[2].classList.add('notify_active');
                document.querySelector(".notifi_plz").style.display = 'block';
                
            }
         
           else {  
                
                var imgSrcs = element.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0].children[0].children[0].src;
                var pos = imgSrcs.indexOf('img') + 3;
                var partPath = imgSrcs.slice(pos);
                items.img = `img${partPath}`;
                var name = element.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                
                items.name = name;
                var price = element.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].children[0].children[1].innerText;

                items.price = price;
                
                var inputValue = element.target.parentElement.parentElement.parentElement.previousElementSibling.children[2].children[2].children[1].children[0].children[0].children[1].value;
                items.amount = inputValue;     
                
                var cartItems = document.createElement('li'); 
                cartItems.classList.add('header__cart-items');
                cartItems.innerHTML =`
                      <a href="#" class="header__cart-items-link">
                      <img src="${items.img}" alt="" class="header__cart-img"> 
                      <div class="header__cart-items-info">
                          <div class="header__cart-items-head">
                            <h5 class="header__cart-items-name">${items.name}</h5>
                            <div class="header__cart-items-wrap">
                            <span class="header__cart-items-price">${items.price}</span>
                            <span class="header__cart-items-multi">x</span>
                            <span class="header__cart-items-amount">${items.amount}</span>
                        </div>
                    </div>
                    <div class="header__cart-items-body">
                        <span class="header__cart-items-descrip">
                            Phân loại: ${items.classify} <span>,${items.classify2}</span>
                        </span>
                        <span class="header__cart-items-remove">
                            Xóa
                        </span>
                    </div>
                </div>
            </a>
            ` ;
           
            var cart = document.querySelector('.header__cart-list-item');
                cart.insertBefore(cartItems,cart.children[0]);
                alert("Sản phẩm đã được thêm vào giỏ hàng");
                if(items.classify2 ===undefined){
                    var classify2 = document.querySelector('.header__cart-items-descrip span');
                    classify2.remove();
                };
  // devare
            if(cart.insertBefore(cartItems,cart.children[0])){
                var devareCart = document.querySelectorAll('.header__cart-items-remove');
                devareCart.forEach(function(del) {
                    del.addEventListener('click',(e)=>{
                       e.target.parentElement.parentElement.parentElement.remove();
                         showCart();
                         limitCart();
                    });
                });
            }
            showCart();
            limitCart();
            }
   }
   
    })

}

// limit cart
function limitCart(){
    var cartLength = document.querySelectorAll('.header__cart-items-link').length;
    if(cartLength ===0){
        document.querySelector('.has_cart').style.display = 'none';
        document.querySelector('.no_cart').style.display='block';
    }else{
        document.querySelector('.has_cart').style.display = 'block';
        document.querySelector('.no_cart').style.display='none';
    }
    
}

// số lượng sp
function showCart() {

    var show = [];
    var items = document.querySelectorAll('.header__cart-items-amount');
    items.forEach(item => {
        show.push(parseFloat(item.textContent));
        
    })
    var totalShow = show.reduce((total,item) =>{
        total += item;
        return total;
    },0)

    if(totalShow == 0){
        document.querySelector('.header__cart-notice').style.display ='none';
        
    }else{
        document.querySelector('.header__cart-notice').style.display ='block';
         document.querySelector('.header__cart-notice').innerText = totalShow;
    }
}

// add class new 
function addClassPrice(){
    var addClass = document.querySelectorAll('.home-product_price');

addClass.forEach(value =>{
    value.children[2].classList.add('price-new');
})

}
// sort
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
// modal (fetch api)
function showModalCart(){
    var items = {};
    var cartItems = document.querySelectorAll('.home-product_item');
    cartItems.forEach(element =>{
        element.addEventListener('click',(e)=>{
            e.preventDefault();
           
            var images = element.querySelectorAll('.home-product-images');
            console.log(images)
            items.image1 = `.${images[0].src.slice(21)}`;
            items.image2 =  `.${images[1].src.slice(21)}`;
            items.image3 =  `.${images[2].src.slice(21)}`;
            items.image4 =  `.${images[3].src.slice(21)}`;
            items.image5 =  `.${images[4].src.slice(21)}`;
            items.image6 =  `.${images[5].src.slice(21)}`;
            items.image7 =  `.${images[6].src.slice(21)}`;
            var imgSrcs = element.children[0].children[0].src;
            var pos = imgSrcs.indexOf('img') +3;
            var partPath = imgSrcs.slice(pos);
            
            items.img = `./img${partPath}`;
            var name = element.children[1].children[0].innerText;
            items.name = name;
            var priceOld = element.children[1].children[1].children[0].innerText;
            var priceNew = element.children[1].children[1].children[2].innerText;
            items.priceNew = priceNew;
            items.priceOld = priceOld ;
            
            if(items.priceOld ===undefined){
                document.querySelector('.price-item-old span').remove();
            }
           
            var cartDetailS =document.createElement('div');
            cartDetailS.classList.add('modal-product');
            cartDetailS.innerHTML = ` <div class="modal__overlay">

            </div>
            <div class="modal__body">
                <div class="product-cart">
                        <div class="product-exit" id="exit">
                            <i class="fas fa-times"></i>
                        </div>
                        <div class="show-cart">
                            <div class="img-container">
                                <div class="img-show">
                                    <img src="${items.img}" alt="">
                                </div>
                                <div class="img_show-click">
                                    <div class="carousel-img">
                                    <div class="item"> <img src="${items.img}" alt=""></div>
                                        <div class="item"><img src="${items.image1}" alt=""></div>
                                        <div class="item"><img src="${items.image2}" alt=""></div>
                                        <div class="item"><img src="${items.image3}" alt=""></div>
                                        <div class="item"><img src="${items.image4}" alt=""></div>
                                        <div class="item"><img src="${items.image5}" alt=""></div>
                                        <div class="item"><img src="${items.image6}" alt=""></div>
                                        <div class="item"><img src="${items.image7}" alt=""></div>
                                       
                                    </div>
    
                                    <button class="prev"><i class="fas fa-chevron-left"></i></button>
                                    <button class="next"><i class="fas fa-chevron-right"></i></button>
                            </div>
                            <div class="product-share-link">
                                <div class="product-icon-share">
                                    <span>Chia sẻ :</span>
                                    <button class="product-sharing product-sharing-mess"></button>
                                    <button class="product-sharing product-sharing-fb"></button>
                                    <button class="product-sharing product-sharing-gg"></button>
                                    <button class="product-sharing product-sharing-pinterest"></button>
                                    <button class="product-sharing product-sharing-twitter"></button>
                                </div>
                                <div class="product-rate">
                                    <svg width="24" height="20" class="rate_heart"><path d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z" stroke="#FF424F" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path></svg>
                                    <div class="product-rated">
                                        Ðã thích (<span>10</span>)
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="add-cart">
                    <div class="name-product">
                        <span>${items.name}</span>
                    </div>
                    <div class="rate-info">
                        <div class="rate-start">
                            <div class="star-wrap">
                                <div class="star-feed underlined">
                                    5.0
                                </div>
                                <div class="stars-rating">
                                    <i class="icon-star fas fa-star"></i>
                                    <i class="icon-star fas fa-star"></i>
                                    <i class="icon-star fas fa-star"></i>
                                    <i class="icon-star fas fa-star"></i>
                                    <i class="icon-star fas fa-star"></i>
                                </div>
                             </div>
                            <div class="evaluate"><div class="evaluate-text underlined">15</div> <span class="elevaluate-num"> Ðánh giá</span> </div>
                            <div class="info-buyed">24 <span> Ðã bán</span></div>
                        </div>
                    </div>
                    <div class="price-info">
                        <div class="price-product">
                            <div class="price-details">
                                <div class="price-item-old"><span class="price-old">${items.priceOld}</span></div>
                                <div class="price-item-new"><span class="price-new">${items.priceNew}</span></div>
                                <div class="price-discount"> 10% GIẢM </div>
                            </div>
                            <div class="label-cheap">
                                <img src="./img/revd.png" alt="">
                                <span class="label-text">Ở dâu rẻ hon, Shopee hoàn tiền</span>
                                <a href="#" class="label-logo"><i class="far fa-question-circle"></i></a>
                            </div>
                        </div>
                    </div>
    
                    <div class="details-product">
                        <div class="product-promotion">
                            <label class="promotion-label">combo khuyến mại</label>
                            <div class="promotion-details">Mua 2 & giảm 2%</div>
                        </div>
                        <div class="product-transform">
                            <label for="">vận chuyển</label>
                            <div class="info-transform">
                               <div class="transform-wapper">
                                    <div class="transform-price">
                                         <img src="/img/free-trán.png" alt="">
                                         Miễn Phí Vận Chuyển
                                    </div>
                               </div>
                                <div class="transform-to">
                                    <div class="transform-to-logo">
                                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="icon-free-shipping-line"><g><line fill="none" stroke-linejoin="round" stroke-miterlimit="10" x1="8.6" x2="4.2" y1="9.8" y2="9.8"></line><circle cx="3" cy="11.2" fill="none" r="2" stroke-miterlimit="10"></circle><circle cx="10" cy="11.2" fill="none" r="2" stroke-miterlimit="10"></circle><line fill="none" stroke-miterlimit="10" x1="10.5" x2="14.4" y1="7.3" y2="7.3"></line><polyline fill="none" points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1" stroke-linejoin="round" stroke-miterlimit="10"></polyline><polyline fill="none" points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2" stroke-linejoin="round" stroke-miterlimit="10"></polyline></g></svg>
                                    </div>
                                    <div class="transform-to-address">
                                        <div class="destination-address">
                                            <label for="">Vận chuyển tới</label>
                                            <div class="address-option">
                                                <span> Huyện Ba Vì, Hà Nội</span>
                                                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                            </div>
                                        </div>
                                        <div class="transform-to-fees">
                                            <label for="">phí vận chuyển</label>
                                            <div class="fees-ship">
                                                <span>0đ</span>
                                                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product-info-details">
                        <div class="product-status-wp">
                            <div class="product-status">
                                <label for="">màu sắc</label>
                                <div class="status-info">
                                <button class="status-category">Đỏ
                                    <div class="">
                                        <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                    </div>
                                </button>
                                <button class="status-category">Đen
                                    <div class="">
                                        <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                    </div>
                                </button>
                                <button class="status-category">Trắng
                                    <div class="">
                                        <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                    </div>
                                </button>
                                <button class="status-category">Xanh lá
                                <div class="">
                                    <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                </div>
                            </button>
                            <button class="status-category">Vàng
                                <div class="">
                                    <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                </div>
                            </button>
                            <button class="status-category">Tím
                            <div class="">
                                <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                            </div>
                        </button>
                        <button class="status-category">Xám
                        <div class="">
                            <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                        </div>
                    </button>
                    <button class="status-category">Xanh nước biển
                    <div class="">
                        <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                    </div>
                </button>
                                </div>
                            </div>
                        </div>
                            <div class="product-status-wp">
                                <div class="product-status">
                                    <label for="">Size</label>
                                    <div class="status-info">
                                    <button class="status-variation">M (45 - 60Kg)
                                    <div class="">
                                        <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                    </div>
                                </button>
                                <button class="status-variation">L (58 - 72 Kg)
                                    <div class="">
                                        <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                    </div>
                                </button>
                                <button class="status-variation">XL (68 - 82Kg)
                                <div class="">
                                    <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                </div>
                            </button>
                                    </div>
                                </div>
                            </div>
                            <div class="product-amount">
                                <label for="">số luợng</label>
                                <div class="amount-details">
                                    <div class="amount-wrap">
                                        <div class="amount-count">
                                            <button class="product-counter prev-count "><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="counter-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg></button>
                                            <input type="text" class="amount-value" value="1">
                                            <button class="product-counter  next-count"><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="counter-icon"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="remaining-amount">
                                    <span>31 sản phẩm có sẵn</span>
                                </div>
                            </div>
                            <div class="notifi_plz">
                                <span>Vui lòng chọn phân loại hàng</span>
                            </div>
                        </div>
                        </div>
                        <div class="add-product-to-cart">
                            <div class="cart-wrap">
                                <div class="cart-handling">
                                    <button class="btn-addcart">
                                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="icon-add-to-cart"><g><g><polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polyline><circle cx="6" cy="13.5" r="1" stroke="none"></circle><circle cx="11.5" cy="13.5" r="1" stroke="none"></circle></g><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5"></line></g></svg>
                                        <span>thêm vào giỏ hàng</span>
                                    </button>
                                    <button class="btn btn-handling"><span>mua ngay</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="product-guaranteed">
                            <a href="#" class="product-guaranteed-link">
                                <img src="./img/guaranteed.png" alt="">
                                <span class="guaranteed-link">Shopee Ðảm Bảo</span>
                                <span>3 Ngày Trả Hàng / Hoàn Tiền</span>
                            </a>
                        </div>
                </div>
            </div>
        </div>`;
            
            var bodyElement = document.getElementsByTagName('body')[0];
            bodyElement.insertBefore(cartDetailS,bodyElement.children[0])
            // test();
            exitModal();
            rateHeart();
            countProduct();
            statusCart();
            addcart();
            showImg();
            carouselImg();
           
    });
        })
  
}


// var detailsApi = 'http://localhost:3002/product-details';
// function starts(id){
//     getDetails(id,function(details){
        
//         renderColor(details);
//         renderConfig(details);
//         renderImgs(details);
//         statusCart();
//         carouselImg();
//         showImg();
        
//     });
    
// }

// function getDetails(id, callback){
//     fetch(detailsApi + "/" + id)
//         .then(response => response.json())
//         .then(callback)
// }
// // render 



// function renderColor(details){
//    var listStt = document.querySelectorAll('.status-info');
   
//     var createColors = details.colors.map(color =>{
//         return `<button class="status-category">${color.color}
//         <div class="">
//             <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
//         </div>
//     </button>`;
    
//     });
//     listStt[0].innerHTML = createColors.join('');
// }

// function renderConfig(details){
//     var listStt = document.querySelectorAll('.status-info');
//     var createConfigs = details.configs.map(config =>{
//         return `
//              <button class="status-variation">${config.config}
//                  <div class="">
//                      <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
//                 </div>
//             </button>`;
//     })
//     listStt[1].innerHTML = createConfigs.join('')
// }
// function renderImgs(details){
//      var listImg = document.querySelector('.carousel-img');
    
//      var CreatListImgs = details.imgs.map(img =>{
//          return `
//              <div class="item"><img src="${img.img}" alt=""></div>
//          `
//      })
//      listImg.innerHTML = CreatListImgs.join('');
// }
//exit
function exitModal(){
    var exitElemnt = document.querySelector('.product-exit');
    var modalElement = document.querySelector('.modal-product');
    var overlayElement = document.querySelector('.modal__overlay');
    
    overlayElement.addEventListener('click',()=>{
        
         modalElement.remove();
        })
    exitElemnt.addEventListener('click',()=>{
        modalElement.remove();
    })
}



function previewImages(){
    var inputsElement = document.querySelectorAll('input[name="imgs"]');

    inputsElement.forEach(element =>{
        element.addEventListener('change',(e)=>{
           
           e.target.nextElementSibling.children[0].src = `./img/${e.target.files[0].name}`;
           e.target.nextElementSibling.children[0].onload = function(){
            URL.revokeObjectURL( e.target.nextElementSibling.children[0].src);

            e.target.nextElementSibling.children[1].style.zIndex = -1 ;
            e.target.nextElementSibling.style.border = 'none';
           }
        })
    })
}
previewImages()
// fetch api - add cart
var productApi = 'http://localhost:3002/products';
function start(){
    getProducts(products =>{
        renderProducts(products);
     
    });
    handleCreatProduct();
}
start();
function creatProducts(data, callback){
    fetch(productApi,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
    })
        .then(response =>response.json())
        .then(callback)
        .catch(err => {
            console.log("lỗi")
        })
}


function handleDeleteProduct(id ,event){
    event.stopPropagation();
    fetch(productApi + '/' + id,{
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
          },
       
    })
        .then(response =>response.json())
        .then(function(){
            var productItem =  document.querySelector('.product-item-' +id);
            if(productItem){
                productItem.remove();
            }
        })
        
}
function handleEditProduct(id, event){
    
    event.stopPropagation();
    var productItem = document.querySelector('.product-item-' +id);
    console.log(productItem.children[0])
    //move
    var mainElement = document.querySelector('.body-sell-wrapper');
    mainElement.style.transform ='translateX('+ 0 +'px)';
    mainElement.style.transition ='all 500ms ease 0s';
    document.querySelector('#creat-sell').style.display ='none';
    document.querySelector('#save-sell').style.display = 'block';
    var imgSrc = document.querySelectorAll('.img-output')[0].src;
    //img
    imgSrc = productItem.children[0].children[0].src;
    part = imgSrc.indexOf('img');
    imgElement = imgSrc.slice(part);

    
    var images = productItem.querySelectorAll('.sell-product-images')
    document.querySelectorAll('.img-output')[1].src = "." + productItem.children[0].children[1].src.slice(21);
    document.querySelectorAll('.img-output')[2].src = "." + productItem.children[0].children[2].src.slice(21);
    document.querySelectorAll('.img-output')[3].src = "." + productItem.children[0].children[3].src.slice(21);
    document.querySelectorAll('.img-output')[4].src = "." + productItem.children[0].children[4].src.slice(21);
    document.querySelectorAll('.img-output')[5].src = "." + productItem.children[0].children[5].src.slice(21);
    document.querySelectorAll('.img-output')[6].src = "." + productItem.children[0].children[6].src.slice(21);
    document.querySelectorAll('.img-output')[7].src = "." + productItem.children[0].children[7].src.slice(21);
    

    document.querySelectorAll('.img-output')[0].src = imgElement;
    document.querySelector('.btn_option').innerHTML = "Hủy";
    
    document.querySelector('input[name="name"]').value = productItem.children[0].children[9].children[0].innerHTML;
    document.querySelector('input[name="oldprice"]').value = productItem.children[1].innerHTML;
    document.querySelector('input[name="address"]').value =  productItem.children[2].innerHTML;
    document.querySelector('input[name="brand"]').value = productItem.children[3].innerHTML;
    
    
    
    document.getElementById('save-sell').addEventListener('click',()=>{
        var formData = {
            dataset: document.getElementById('select-category').value,
            name: document.querySelector('input[name="name"]').value,
            oldprice: document.querySelector('input[name="oldprice"]').value,
            address: document.querySelector('input[name="address"]').value,
            brand: document.querySelector('input[name="brand"]').value,
            img: "." + document.querySelectorAll('.img-output')[0].src.slice(21) ,
            imgs: [
                {
                  img: "." + document.querySelectorAll('.img-output')[1].src.slice(21)
                },
                {
                  img: "." + document.querySelectorAll('.img-output')[2].src.slice(21)
                },
                {
                  img: "." + document.querySelectorAll('.img-output')[3].src.slice(21)
                },
                {
                  img: "." + document.querySelectorAll('.img-output')[4].src.slice(21)
                },
                {
                  img: "." + document.querySelectorAll('.img-output')[5].src.slice(21)
                },
                {
                  img: "." + document.querySelectorAll('.img-output')[6].src.slice(21)
                },
                {
                  img: "." + document.querySelectorAll('.img-output')[7].src.slice(21)
                },
                {
                  img: "." + document.querySelectorAll('.img-output')[8].src.slice(21)
                }
              ]
        };
    
    editProduct(formData, id ,function(){
        getProducts(renderProducts);
    });
    })
     

}

function editProduct(data, id){
    var options = {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(data) // We send data in JSON format
    }
    fetch(productApi + '/' +id,options)
    .then(function(response) {
        response.json();
    })
    .then(function(){
        document.querySelector('#creat-sell').style.display ='block';
        document.querySelector('#save-sell').style.display = 'none';
        document.querySelector('.btn_option').innerHTML = "Tất cả sản phẩm";
    })
}

function handleCreatProduct(){
    var creatBtn = document.getElementById('creat-sell');
    creatBtn.addEventListener('click',(e)=>{
        e.preventDefault(); 
        
        var dataset = document.getElementById('select-category').value;
        var name = document.querySelector('input[name="name"]').value; 
        var address = document.querySelector('input[name="address"]').value;
        var brand = document.querySelector('input[name="brand"]').value;
        var oldprice = document.querySelector('input[name="oldprice"]').value;
        var img = document.querySelector('input[id="input-img"]').files[0].name;
        var image1 = document.querySelector('input[id="input-img-1"]').files[0].name;
        var image2 = document.querySelector('input[id="input-img-2"]').files[0].name;
        var image3 = document.querySelector('input[id="input-img-3"]').files[0].name;
        var image4 = document.querySelector('input[id="input-img-4"]').files[0].name;
        var image5 = document.querySelector('input[id="input-img-5"]').files[0].name;
        var image6 = document.querySelector('input[id="input-img-6"]').files[0].name;
        var image7 = document.querySelector('input[id="input-img-7"]').files[0].name;
        var image8 = document.querySelector('input[id="input-img-8"]').files[0].name;
        var formData = {
            dataset:dataset,
            name: name,
            oldprice: oldprice,
            address: address,
            brand: brand,
            img: "./img/" + img,
            imgs: [
                {
                  img: "./img/" + image1
                },
                {
                  img: "./img/" + image2
                },
                {
                  img: "./img/" + image3
                },
                {
                  img: "./img/" + image4
                },
                {
                  img: "./img/" + image5
                },
                {
                  img: "./img/" + image6
                },
                {
                  img: "./img/" + image7
                },
                {
                  img: "./img/" + image8
                }
              ]
        }
        creatProducts(formData,function(){
            getProducts(renderProducts);
        });
            
        
    })
}
function getProducts(callback){
    fetch(productApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
        .catch(err => console.log(err))
}
function renderProducts(products){
    var listProduct = document.querySelector('.product-main');
    var listSell = document.querySelector('.sell_product');
    var htmls = products.map(function(product){
       
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND',
          });
        var newPrice = ((parseInt(product.oldprice) - (parseInt(product.oldprice) / 100 * 10 ))) ;
        
       return `
        <div class="col l-2-4 m-4 c-6">
        <div class="home-product_item">
            <div class="home-product_img">
                <img src="${product.img}" alt="" class="home-product-item_img">
                <img src="${product.imgs[0].img}" alt="" class="home-product-images">
                <img src="${product.imgs[1].img}" alt="" class="home-product-images">
                <img src="${product.imgs[2].img}" alt="" class="home-product-images">
                <img src="${product.imgs[3].img}" alt="" class="home-product-images">
                <img src="${product.imgs[4].img}" alt="" class="home-product-images">
                <img src="${product.imgs[5].img}" alt="" class="home-product-images">
                <img src="${product.imgs[6].img}" alt="" class="home-product-images">
                <img src="${product.imgs[7].img}" alt="" class="home-product-images">
                <div class="home-product_favourite">
                    <span class="home-product_favourite-name">Yêu thích</span>
                </div>
                <div class="home-product_sale">
                    <span class="home-product_sale-percent">10%</span>
                    <span class="home-product_sale-label">GIẢM</span>
                </div>
            </div>
            <div class="home-product_content">
                <div class="home-product_description">
                    <h4 class="home-product_description-name">
                        ${product.name}
                    </h4>
                </div>
                <div class="home-product_price">
                    <span class="price old-price">${formatter.format(product.oldprice).replaceAll(',','.')}</span>
                    <span class="unit"></span>
                    <span class="price">${formatter.format(newPrice).replaceAll(',','.')}</span>
                </div>
                <div class="home-product_action">
                    <div class="home-product_action-like home-product_action-liked">
                       <svg class="heart-item" height="16" viewBox="0 0 16 16" width="16" version="1.1"><path d="m7.251221 4.2145388c-.549143-.4552525-1.2488781-.7145388-1.951221-.7145388-1.5719593 0-2.8 1.2269253-2.8 2.7970027 0 .5878515.158291 1.1598348.483492 1.7618948.6414654 1.1875754 1.5644044 2.1358244 4.4829309 4.7799304l.5348542.4864596.5326254-.4807607c2.9306205-2.660747 3.8471674-3.6039919 4.486777-4.7931984.3223805-.5993922.4793205-1.1689848.4793205-1.7543257 0-1.5700774-1.2280407-2.7970027-2.8-2.7970027-.7029148 0-1.4032175.2597087-1.9497845.7133288l-.0367779.0309601c-.1203966.1029087-.2318185.2143106-.3329071.3329122l-.3805305.4464557-.3805305-.4464557c-.1010886-.1186016-.2125105-.2300035-.3301434-.3305672z" fill="none" stroke="#000" stroke-opacity=".54"></path></svg>
                    </div>
                    <div class="home-product_action-rate">
                        <i class="home-product_action-rate_gold fas fa-star"></i>
                        <i class="home-product_action-rate_gold fas fa-star"></i>
                        <i class="home-product_action-rate_gold fas fa-star"></i>
                        <i class="home-product_action-rate_gold fas fa-star"></i>
                        <i class="home-product_action-rate_gold fas fa-star"></i>
                    </div>
                    <div class="home-product_action-sold"><span></span></div>
                   
                </div>
                <div class="home-product-origin">
                    <span class="home-product_brand">${product.brand}</span>
                    <span class="home-product-address">${product.address}</span>
                   
                </div>
            </div>
        </div>
    </div>
        `;
    }
        );
    var sell = products.map(function(product){
     
        return `
        <div class="sell-main_product product-item-${product.id}">
            <div class="sell-main_info">
                <img src="${product.img}" alt="">
                <img src="${product.imgs[0].img}" alt="" class="sell-product-images">
                <img src="${product.imgs[1].img}" alt="" class="sell-product-images">
                <img src="${product.imgs[2].img}" alt="" class="sell-product-images">
                <img src="${product.imgs[3].img}" alt="" class="sell-product-images">
                <img src="${product.imgs[4].img}" alt="" class="sell-product-images">
                <img src="${product.imgs[5].img}" alt="" class="sell-product-images">
                <img src="${product.imgs[6].img}" alt="" class="sell-product-images">
                <img src="${product.imgs[7].img}" alt="" class="sell-product-images">
                <div class="info-name">
                     <span>${product.name}</span>
                </div>
            </div>
            <div class="varition-oldprice">${product.oldprice}</div>
            <div class="varition-address">${product.address}</div>
            <div class="varition-brand">${product.brand}</div>
            
            <div class="sell-main_action">
                <button class="sell-edit" onclick="handleEditProduct(${product.id},event)">Sửa</button>
                <button class="sell-delete" onclick="handleDeleteProduct(${product.id},event)">Xóa</button>
            </div>
    </div>`
    })
    listSell.innerHTML = sell.join('');
    listProduct.innerHTML = htmls.join('');
    rateHearts();
    addClassPrice();
    showModalCart();
    runSortCart();
}

