import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const closeMenu = (menu, button) => {
  menu.classList.remove('menu--active');
  button.classList.remove('burger--active')
}

const toggleMenu = (e) => {
  if (e.target.matches('.js-burger')) {
    const button = e.target;
    const menu = document.querySelector('.menu');
    const items = document.querySelectorAll('.menu__item');
    const menuActive = document.querySelector('.menu--active');

    menu.classList.toggle('menu--active');
    button.classList.toggle('burger--active')

    items.forEach((item) => item.addEventListener('click', () => {
      closeMenu(menu, button);
      enableBodyScroll(menu);
    }))

    if (!menuActive) disableBodyScroll(menu);
    else enableBodyScroll(menu);
  }
}

document.addEventListener('click', toggleMenu);
