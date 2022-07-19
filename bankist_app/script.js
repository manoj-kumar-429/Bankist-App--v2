'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// console.log(btnsOpenModal.length);
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
btnScrollTo.addEventListener(`click`, function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log(`current scroll (X/Y): `, window.scrollX, window.scrollY);
  // console.log(
  //   `height/width viewport: `,
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: `smooth`,
  // });
  section1.scrollIntoView({ behavior: `smooth` });
});
// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});
//
// tabs toggle mechanism
//
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));
  clicked.classList.add(`operations__tab--active`);
  tabsContent.forEach(e => e.classList.remove(`operations__content--active`));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});
//
// nav items hover mechanism
//
const nav = document.querySelector(`nav`);
const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));
// const initialCoords = section1.getBoundingClientRect();
// nav.addEventListener(`mouseover`, function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener(`mouseout`, function (e) {
//   handleHover(e, 1);
// });
// console.log(initialCoords);
// window.addEventListener(`scroll`, function () {
//   if (this.window.scrollY > initialCoords.top) nav.classList.add(`sticky`);
//   else nav.classList.remove(`sticky`);
// });
//
// sticky nav mechanism
//
const header = document.querySelector(`header`);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//
// revealing sections mechanism
//
const allSections = document.querySelectorAll(`.section`);
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});
//
// interchanging lazy imgs with originals mechanism
//
const lazyImgAll = document.querySelectorAll(`.lazy-img`);
const revealImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});
lazyImgAll.forEach(function (img) {
  imgObserver.observe(img);
});

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(`entry`));
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
//
// slides toggle mechanism
//
const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const slider = document.querySelector(`.slider`);
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  const dotContainer = document.querySelector(`.dots`);
  let curSlide = 0;
  const maxSlide = slides.length - 1;
  // slider.style.transform = `translateX(-400px) scale(0.3)`;
  // slider.style.overflow = `visible`;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
    activeDot(slide);
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide;
    else curSlide--;
    goToSlide(curSlide);
    // activeDot(curSlide);
  };
  btnRight.addEventListener(`click`, nextSlide);
  btnLeft.addEventListener(`click`, prevSlide);
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowRight`) nextSlide();
    e.key === `ArrowLeft` && prevSlide();
  });
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class = "dots__dot" data-slide = ${i}></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));
    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  dotContainer.addEventListener(`click`, function (e) {
    if (!e.target.classList.contains(`dots__dot`)) return;
    // console.log(e.target.dataset.slide);
    curSlide = Number(e.target.dataset.slide);
    goToSlide(curSlide);
    // activeDot(slide);
  });
  const init = function () {
    createDots();
    goToSlide(0);
    // activeDot(0);
  };
  init();
};
slider();
document.addEventListener(`DOMContentLoaded`, function (e) {
  console.log(`HTML parsed and the DOM tree built`, e);
});
window.addEventListener(`load`, function (e) {
  console.log(`loaded`, e);
});
// window.addEventListener(`beforeunload`, function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ``;
// });

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
// const h1 = document.querySelector(`h1`);
// // console.log(h1.previousElementSibling);
// // console.log(h1.nextElementSibling);
// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) e.style.transform = `scale(0.5)`;
// });
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstChild);
// console.log(h1.lastElementChild);
// console.log(h1.lastChild);
// console.log(h1.parentElement);
// console.log(h1.parentNode);
// console.log(h1.closest(`h1`));
// const h1 = document.querySelector(`h1`);
// let count = 0;
// const alertH1 = function () {
//   count++;
//   alert(count);
//   if (count === 3) h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// h1.addEventListener(`mouseenter`, function () {
//   alert();
// });
// h1.onmouseenter = function () {
//   alert();
// };
// const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randColor = () =>
//   `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
// console.log(randColor());
// document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = randColor();
// });
// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = randColor();
//   e.stopPropagation();
// });
// document.querySelector(`.nav`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = randColor();
// });
