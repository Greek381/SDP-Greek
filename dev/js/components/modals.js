const btnOne = document.querySelectorAll('.card-description__btn')
const modal = document.querySelector('.modal')
const modalBuyOneClick = document.querySelector('.modal-buy-oneclick')
const modalCallback = document.querySelector('.modal-callback')
const sendIn = document.querySelector('#sendIn')
const btnCloseModal = document.querySelectorAll('.modal-buy-oneclick-close')
const btnCloseModalSwiper = document.querySelector('.modal-buy-oneclick-close-swiper')
const form = document.getElementById('formEvent')
const input = document.querySelectorAll('.feedback__input')


btnOne.forEach((el) => {
  el.addEventListener('click', () => {
    modal.classList.add('modal-visible')
    modalBuyOneClick.classList.add('modal-buy-oneclick-visible')

    for (let i = 0; i < input.length; i++ ) {
      form.addEventListener('submit', (event) => {
      event.preventDefault()
      if (((input[0].classList.contains('js-validate-error-field')) === false) &&
          ((input[1].classList.contains('js-validate-error-field')) === false)) {
          modalBuyOneClick.classList.remove('modal-buy-oneclick-visible')
          modalCallback.classList.add('modal-callback-visible')
        }
      })

    }

    btnCloseModal.forEach((el) => {
      el.addEventListener('click', () => {
        modal.classList.remove('modal-visible')
        modalBuyOneClick.classList.remove('modal-buy-oneclick-visible')
        modalCallback.classList.remove('modal-callback-visible')
      })
    })
  })
})

//modal swiper
const modalSwiper = document.querySelector('#modalswiper')
const cardSlider = document.querySelector('.card-slider')
const modalSwiperContainer = document.querySelector('.modal-swiper-container')
const navItemSlider = document.querySelectorAll('.slider-nav__item')
const navSlier = document.querySelector('.slider-nav')

if(modalSwiper) {
  modalSwiper.addEventListener('click', () => {
    cardSlider.classList.add('modal-card-slider')
    modalSwiperContainer.classList.add('modal-swiper-container-visible')
    btnCloseModalSwiper.classList.add('modal-buy-oneclick-close-swiper-visible')
    navSlier.classList.remove('slider-nav')
    navSlier.classList.add('slider-nav_modal')

    navItemSlider.forEach(el => {
      el.classList.add('slider-nav__item_modal')
    })
    btnCloseModal.forEach((el) => {
      el.addEventListener('click', () => {
        cardSlider.classList.remove('modal-card-slider')
        modalSwiperContainer.classList.remove('modal-swiper-container-visible')
        btnCloseModalSwiper.classList.remove('modal-buy-oneclick-close-swiper-visible')
        navSlier.classList.remove('slider-nav_modal')
        navSlier.classList.add('slider-nav')
      })
    })
  })
}


