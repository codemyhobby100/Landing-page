/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/**
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

const headerActive = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", headerActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '90px',
    duration: 3000,
})

sr.reveal(`.home__data`, {origin: 'top', delay: 400})
sr.reveal(`.home__img`, {origin: 'bottom', delay: 600})
sr.reveal(`.home__footer`, {origin: 'bottom', delay: 800})

// coudown
const seconds = document.querySelector(".seconds .number"),
  minutes = document.querySelector(".minutes .number"),
  hours = document.querySelector(".hours .number"),
  days = document.querySelector(".days .number");

let initialTime = {
  secValue: 0,
  minValue: 0,
  hourValue: 4,
  dayValue: 9,
};

let currentTime = Object.assign({}, initialTime);

// Check if there are stored values in localStorage
const storedValues = localStorage.getItem("newCountdownValues");

if (storedValues) {
  const storedData = JSON.parse(storedValues);
  if (
    storedData.secValue >= 0 &&
    storedData.minValue >= 0 &&
    storedData.hourValue >= 0 &&
    storedData.dayValue >= 0
  ) {
    currentTime = storedData;
  } else {
    currentTime = Object.assign({}, initialTime);
    localStorage.setItem("newCountdownValues", JSON.stringify(currentTime));
  }
} else {
  // If no stored values, set the initial values
  currentTime = Object.assign({}, initialTime);
  localStorage.setItem("newCountdownValues", JSON.stringify(currentTime));
}

const timeFunction = setInterval(() => {
  if (currentTime.secValue > 0) {
    currentTime.secValue--;
  } else {
    if (currentTime.minValue > 0) {
      currentTime.minValue--;
      currentTime.secValue = 59;
    } else {
      if (currentTime.hourValue > 0) {
        currentTime.hourValue--;
        currentTime.minValue = 59;
      } else {
        if (currentTime.dayValue > 0) {
          currentTime.dayValue--;
          currentTime.hourValue = 23;
        } else {
          clearInterval(timeFunction);
        }
      }
    }
  }

  // Update the displayed values
  seconds.textContent = currentTime.secValue < 10 ? `0${currentTime.secValue}` : currentTime.secValue;
  minutes.textContent = currentTime.minValue < 10 ? `0${currentTime.minValue}` : currentTime.minValue;
  hours.textContent = currentTime.hourValue < 10 ? `0${currentTime.hourValue}` : currentTime.hourValue;
  days.textContent = currentTime.dayValue < 10 ? `0${currentTime.dayValue}` : currentTime.dayValue;

  // Store the current values in localStorage
  localStorage.setItem("newCountdownValues", JSON.stringify(currentTime));
}, 1000); // 1000ms = 1s
