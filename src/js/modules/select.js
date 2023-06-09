const removeClass = (selectBox) => {
  selectBox.classList.remove('select-box--active');
};

const createSelect = () => {
  const selects = document.querySelectorAll('.select-box__base');

  selects.forEach((select) => {
    const parent = select.parentNode;
    const selectHeader = parent.querySelector('.select-box__header');
    const selectDropdown = parent.querySelector('.select-box__dropdown');

    selectHeader.innerHTML = select.options[0].innerHTML;

    Array.from(select.options).forEach((option, index) => {
      const selectItem = document.createElement('span');

      selectItem.classList.add('select-box__item');
      selectItem.setAttribute('data-value', option.value)
      selectItem.innerHTML = option.innerHTML;

      if (index === select.options.selectedIndex) selectItem.classList.add('select-box__item--active')

      selectDropdown.appendChild(selectItem);
    })

  })
}

const showSelect = (e) => {
  if (e.target.matches('.select-box__top')) {
    const selectBox = e.target.closest('.select-box');
    const header = selectBox.querySelector('.select-box__header');
    const dropdown = selectBox.querySelector('.select-box__dropdown');
    const options = dropdown.querySelectorAll('.select-box__item');
    const baseSelect = selectBox.querySelector('.select-box__base');
    const activeSelectBox = selectBox.querySelector('.select-box--active');

    if (activeSelectBox && activeSelectBox !== selectBox) {
      removeClass(activeSelectBox);
    }

    selectBox.classList.toggle('select-box--active');

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        baseSelect.options[index].selected = true;
        header.innerHTML = option.innerHTML;

        options.forEach((option) => option.classList.remove('select-box__item--active'))
        option.classList.add('select-box__item--active')
        removeClass(selectBox)
      });
    });
  }
}

const closeSelect = (e) => {
  const selectBox = e.target.closest('.select-box');

  if (!selectBox) {
    const selectBoxes = document.querySelectorAll('.select-box');
    selectBoxes.forEach((box) => {
      if (box.classList.contains('select-box--active')) {
        removeClass(box);
      }
    });
  }
}

createSelect();

document.addEventListener('click', closeSelect);
document.addEventListener('click', showSelect)
