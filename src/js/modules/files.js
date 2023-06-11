const addedFile = (e) => {
  if (e.target.matches('.js-file')) {
    const input = e.target;
    const label = e.target.closest('.form__label');
    const name = label.querySelector('.form__name');

    if (input.files.length) {
      name.textContent = 'Файл прикреплен';
      label.classList.add('form__label--active');
    }
  }

}

document.addEventListener('change', addedFile);
