import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


const toggle = (e) => {
  if (e.target.matches('.js-burger')) {
    const button = e.target;
    const menu = document.querySelector('.menu');
    const menuActive = document.querySelector('.menu--active');

    menu.classList.toggle('menu--active');
    button.classList.toggle('burger--active')

    if (!menuActive) disableBodyScroll(menu);
    else enableBodyScroll(menu);
  }
}

document.addEventListener('click', toggle);
