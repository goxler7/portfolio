let slides = document.querySelectorAll('.projects--slide');
let currentSlide = 0;
let isEnabled = true;
const rightBtn = document.querySelector('.round_btn-right');
const leftBtn = document.querySelector('.round_btn-left');

function changeCurrentSlide (n) {
  currentSlide = (n + slides.length) % slides.length;

} 

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('projects--slide-active', direction);
  })
}

function showSlide(direction) {
  slides[currentSlide].classList.add('projects--slide-next', direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('projects--slide-next', direction);
    this.classList.add('projects--slide-active');
    isEnabled = true;
  })
}

function previousSlide (n) {
  hideSlide('to-right');
  changeCurrentSlide(n - 1);
  showSlide('from-left');
}

function nextSlide (n) {
  hideSlide('to-left');
  changeCurrentSlide(n + 1);
  showSlide('from-right');
}

if (leftBtn) {
  leftBtn.addEventListener('click', function() {
    if (isEnabled) {
      previousSlide(currentSlide)
    }
  });
}

if (rightBtn) {
  rightBtn.addEventListener('click', function() {
    if (isEnabled) {
      nextSlide(currentSlide)
    }
  });
}

const swipeDetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
 
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', function(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
  
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if(isEnabled) {
            previousSlide(currentSlide);
          }
        } else {
          if(isEnabled) {
            nextSlide(currentSlide);
          }
        }
      }
    }
    e.preventDefault();
  });

  surface.addEventListener('touchstart', function(e) {
    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });

  surface.addEventListener('touchend', function(e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
  
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if(isEnabled) {
            previousSlide(currentSlide);
          }
        } else {
          if(isEnabled) {
            nextSlide(currentSlide);
          }
        }
      }
    }
    e.preventDefault();
  });
}

let el = document.querySelector('.projects--slide_container');

if (el) {
  swipeDetect(el);
}