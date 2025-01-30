const swiper = new Swiper('.poster.swiper', {
    autoplay: true, /* 是否自動輪播 */ 
    loop: true,  /* 自動輪迴 */
    pagination: {  /* 下面輪播點點點 */
      el: '.dots-list',  
      bulletClass: 'bullet',
      bulletActiveClass: 'bullet-active',  /* 亮燈樣式 */
      clickable: true
    },
    navigation: {  /* 左右箭頭 */
      nextEl: '.next-btn',
      prevEl: '.pre-btn',
    },
});

const promoteCarousel = new Swiper('.promote-carousel', {
  autoplay: true,
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  speed: 5000,
  freeMode: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 6,
    }
  }
});