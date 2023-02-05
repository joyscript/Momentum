import { user } from './user.js';
import { updateBar } from './service.js';
import { changeBtns } from './settings.js';

const root = document.querySelector(':root');
const menuColors = document.querySelector('.menu-colors');
const colorInputs = menuColors.querySelectorAll('input[data-color]');
const copyBtn = menuColors.querySelector('.copy-button');

const colors = {
  dark: {
    active: '#ce51f5',
    modal: '#ffffff',
    modalBg: '#09031599',
    activeBtn: '#ffffff',
  },
  light: {
    active: '#419cf1',
    modal: '#303030',
    modalBg: '#ffffffee',
    activeBtn: '#ffffff',
  },
  user: null,
};

let curTheme = colors[user.colorTheme];
colors.user = user.customTheme || Object.assign({}, curTheme);

const toggleColorInputs = () => {
  colorInputs.forEach((input) => (input.disabled = user.colorTheme !== 'user'));
};

const changeColorInputs = () => {
  colorInputs.forEach((input) => {
    if (input.dataset.color === 'alphaBg') {
      input.value = parseInt(curTheme.modalBg.slice(-2), 16);
      updateBar(input);
    } else if (input.dataset.color === 'modalBg') {
      input.value = curTheme.modalBg.slice(0, -2);
    } else {
      input.value = curTheme[input.dataset.color];
    }
  });
};

const changeTheme = () => {
  curTheme = colors[user.colorTheme];
  user.colorTheme === 'user' ? menuColors.classList.add('custom') : menuColors.classList.remove('custom');
  for (let key in curTheme) root.style.setProperty(`--color-${key}`, curTheme[key]);
  changeColorInputs();
  toggleColorInputs();
};

const changeColor = (input) => {
  if (input.dataset.color === 'alphaBg' || input.dataset.color === 'modalBg') {
    input.dataset.color === 'alphaBg'
      ? (colors.user.modalBg = colors.user.modalBg.slice(0, -2) + parseInt(input.value).toString(16).padStart(2, '0'))
      : (colors.user.modalBg = input.value + colors.user.modalBg.slice(-2));
    root.style.setProperty(`--color-modalBg`, colors.user.modalBg);
  } else {
    colors.user[input.dataset.color] = input.value;
    root.style.setProperty(`--color-${input.dataset.color}`, input.value);
  }
};

const copyColors = () => {
  user.colorTheme = 'user';
  colors.user = Object.assign({}, curTheme);
  menuColors.classList.add('custom');
  changeBtns('colorTheme');
  toggleColorInputs();
};

const saveColors = () => (user.customTheme = colors.user);

menuColors.addEventListener('input', (e) => {
  if (user.colorTheme === 'user') changeColor(e.target);
});

copyBtn.addEventListener('click', copyColors);

export { changeTheme, saveColors };
