import noUiSlider from 'nouislider';


const range = document.querySelector('.range__slider');
const rangeValue = document.querySelector('.range__value');
const baseRange = document.querySelector('.js-range');

noUiSlider.create(range, {
  start: 0,
  step: 1,
  animate: false,
  range: {
    min: 0,
    max: 100
  },
  cssPrefix: 'range-custom-'
});

range.noUiSlider.on('update', function (values) {
  rangeValue.innerHTML = `${Number(values)}%`;
  baseRange.value = Number(values)
});
