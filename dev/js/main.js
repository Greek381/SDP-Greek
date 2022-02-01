
//header select
const element = document.querySelector('#selectCustomRegion');
const choices = new Choices(element, {
  searchEnabled: false
});

const elements = document.querySelectorAll('#selectCustomCategory');
elements.forEach(el => {
  const choices = new Choices(el, {
    searchEnabled: false,
    classNames: {
      containerOuter: 'choices-category',
      containerInner: 'choices-category__inner',
      list: 'choices-category__list',
      listDropdown: 'choices-category__list--dropdown',
    }
  })
})

//hero swiper
var swiper = new Swiper('.hero-swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
})

//special swiper
var swiperSpec = new Swiper('.special-swiper', {
  navigation: {
    nextEl: '.swiper-sdp-button-next',
    prevEl: '.swiper-sdp-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 50,
    },
    686: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 33,
    },
    996: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
    1311: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      spaceBetween: 32,
    }
  }
})

//good swiper
var swiperGood = new Swiper('.good-swiper', {
  navigation: {
    nextEl: '.good-swiper-button-next',
    prevEl: '.good-swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 50,
    },
    686: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    996: {
      slidesPerView: 3,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    1311: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30
    }
  }
})

//show more
const btnMore = document.querySelector('.raiting__btn-more')
if (btnMore) {
  let carts = document.getElementsByClassName('raiting-item-hidden')
  let cartsMobile = document.getElementsByClassName('raiting-item-hidden-tablet')

  btnMore.addEventListener('click', () => {
    for (let i = 0; i < carts.length; i++) {
      carts[i].style.display = 'grid'
    }
    for (let i = 0; i < cartsMobile.length; i++) {
      cartsMobile[i].style.display = 'grid'
    }
    btnMore.style.display = 'none'
  })
}


//validation form
var selector = document.querySelector("input[type='tel']");
if (selector) {
  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  new JustValidate('.feedback-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 40
      },
      tel: {
        required: true,
        function: () => {
          const phone = selector.inputmask.unmaskedvalue()
          console.log(phone)
          return Number(phone) && phone.length === 10
        },
      },
      mail: {
        required: true,
        email: true,
      },
      checkbox: {
        require: true,
      },
    },

    messages: {
      name: {
        required: 'Поле обязательное для заполнения',
        minLength: 'Недопустимый формат'
      },
      tel: {
        required: 'Поле обязательное для заполнения',
        function: 'Недопустимый формат'
      },
      mail: {
        required: 'Поле обязательное для заполнения',
        email: 'Недопустимый формат',
      },
      checkbox: {
        require: 'Поле обязательное для заполнения',
      },
    },
  });
}


const btn = document.querySelector('.feedback-btn')
if (btn) {
  btn.setAttribute('disabled', 'disabled')

  const label = document.getElementById('check')
  label.addEventListener('click', () => {
    let k = label.toggleAttribute('checked')
    if (k === true) {
      btn.disabled = false
    } else {
      btn.disabled = true
    }
  })
}

const input = document.querySelectorAll('.feedback-input')
if (input) {
  for (let item of input) {
    item.addEventListener('input', () => {
      if (item.classList.remove('js-validate-error-field')) {
        item.style.border = '1px solid #ff6972'
      } else {
        item.style.border = '1px solid #B8EC64'
        item.style.color = '#333333'
      }
    })
  }

  let form = document.getElementById('formEvent')
  let callback = document.querySelector('.feedback-callback')

  for (let i = 0; i < input.length; i++ ) {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      if (((input[0].classList.contains('js-validate-error-field')) === false) &&
        ((input[1].classList.contains('js-validate-error-field')) === false) &&
        ((input[2].classList.contains('js-validate-error-field')) === false)) {
        callback.classList.add('feedback-callback-visible')
        function deleteThanks() {
          callback.classList.remove('feedback-callback-visible')
        }
        setTimeout(deleteThanks, 5000)
      }
    })
  }
}

const burger = document.querySelector('.burger')
if (burger) {
  const burgerMenu = document.querySelector('.header-nav')

  burger.addEventListener('click', (e) => {
    e.preventDefault()
    burger.classList.toggle('burger_active')
    burgerMenu.classList.toggle('header-nav_active')
  })
}

//tooltip
tippy('.feedback-tooltip', {
  content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.',
  arrow: true,
});


//uislider
const uiSlider = document.getElementById('uislider');

if (uiSlider) {
  noUiSlider.create(uiSlider, {
    start: [2000, 150000],
    connect: true,
    step: 10,
    range: {
      'min': 0,
      'max': 225000
    }
  });

  const input0 = document.getElementById('input-0')
  const input1 = document.getElementById('input-1')
  const inputs = [input0, input1]

  uiSlider.noUiSlider.on('update', function(values, handle) {
    inputs[handle].value = Math.round(values[handle])
  })

  const setUiSlider = (i, value) => {
    let arr = [null, null]
    arr[i] = value
    uiSlider.noUiSlider.set(arr)
  }

  inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
      setUiSlider(index, e.currentTarget.value)
    })
  })
}


//catalog filter list
const buttonsFilter = document.querySelectorAll('.filter-btn')
const listFilter = document.querySelectorAll('.catalog-page__list-laptop')

for (let i = 0, j = 0; i < buttonsFilter.length, j < listFilter.length; i++, j++) {
  buttonsFilter[i].addEventListener('click', () => {
    buttonsFilter[i].classList.toggle('filter-btn_active')
    listFilter[j].classList.toggle('catalog-page__list_active')
    if (buttonsFilter[i].classList.contains('filter-btn_active')) {
      buttonsFilter[i].style.zIndex = '11'
    } else {
      buttonsFilter[i].style.zIndex = '5'
    }
    if (listFilter[j].classList.contains('catalog-page__list_active')) {
      listFilter[j].style.zIndex = '10'
    }
  })

  window.addEventListener('click', e => {
    const target = e.target
    if (!target.closest('.catalog-page__list-laptop') && !target.closest('.filter-btn')) {
      buttonsFilter[i].classList.remove('filter-btn_active')
      listFilter[j].classList.remove('catalog-page__list_active')
    }
  })
}

// card-swiper
var cardSwiper = new Swiper('.slider-block', {
  slidesPerView: 'auto',
})

const sliderNavItem = document.querySelectorAll('.slider-nav__item')

sliderNavItem.forEach(el => {
  el.addEventListener('click', (e) => {
    const index= parseInt(e.currentTarget.dataset.index)
    cardSwiper.slideTo(index)
  })
})

//similar product
var swiper = new Swiper('.similar-swiper', {
  navigation: {
    nextEl: '.good-swiper-button-next',
    prevEl: '.good-swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 16,
    },
    686: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    996: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
    1311: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30
    }
  }
})

//
var swiper = new Swiper('.slider-nav', {
  breakpoints: {
    320: {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 38,
    },
    686: {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 18,
    },
    996: {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 38
    }
  }
})

var swiper = new Swiper('.slider-nav_modal', {
  navigation: {
    nextEl: '.good-swiper-button-next',
    prevEl: '.good-swiper-button-prev',
  },
  spaceBetween: 78,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    686: {
      slidesPerView: 2,
    },
    996: {
      slidesPerView: 3,
    },
    1311: {
      slidesPerView: 4,
    },
  }
})
