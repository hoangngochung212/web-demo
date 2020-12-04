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
        overlayModal.style.display ='none';
    })
  

}
export {openNavMobile};
