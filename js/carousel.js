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
 sliders.addEventListener("mousemove" , ()=> {
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

// Carousel product
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

