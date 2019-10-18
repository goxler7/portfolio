import './assets/scss/main.scss'
import './js/carousel'

const edu = document.querySelector('.edu');
const frame = document.querySelector('.frame_block--item');
const viewChangeBtn = document.getElementById('viewChangeBtn');
const showDescrBtn = document.querySelector('.descrp_btn');

if (showDescrBtn) {
  showDescrBtn.addEventListener('click', function(){
    document.querySelectorAll('.projects--description').forEach(descr => {
      descr.classList.toggle('projects--description-active');
    })
  })
}

if (viewChangeBtn) {
  viewChangeBtn.addEventListener('click', function(){
    frame.classList.toggle('frame_block--item-mobile');
    viewChangeBtn.innerHTML === 'Desktop' ? viewChangeBtn.innerHTML = 'Mobile' : viewChangeBtn.innerHTML = 'Desktop';
  });
}

if (edu) {
  document.querySelector('.edu--header').addEventListener('mousedown', function(){
    edu.classList.toggle('edu-opened');
  });
}


