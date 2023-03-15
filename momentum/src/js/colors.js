import { user } from './user.js';
import { updateBar } from './common.js';

const root = document.querySelector(':root');
const colorOption = document.querySelector('.color-option');
const colorInputs = colorOption.querySelectorAll('input[data-color]');
const copyBtn = colorOption.querySelector('.copy-button');
const userThemeBtn = document.querySelector('input[value="user"]');

const themes = {
  dark: {
    active: '#e100ff',
    modal: '#ffffff',
    activeBtn: '#ffffff',
    modalBg: '#09031599',
    overlay: '#00001445',
  },
  light: {
    active: '#00fafa',
    modal: '#303030',
    activeBtn: '#303030',
    modalBg: '#ffffffdd',
    overlay: '#00001445',
  },
};

const setTheme = () => {
  if (!user.customTheme) user.customTheme = Object.assign({}, themes[user.colorTheme]);
  changeTheme();
};

const changeTheme = () => {
  const curTheme = user.colorTheme === 'user' ? user.customTheme : themes[user.colorTheme];
  user.colorTheme === 'user' ? colorOption.classList.add('custom') : colorOption.classList.remove('custom');
  cnahgeRootColors(curTheme);
  changeColorInputs(curTheme);
  changeInputsState();
};

const cnahgeRootColors = (curTheme) => {
  for (let key in curTheme) root.style.setProperty(`--color-${key}`, curTheme[key]);
};

const changeColorInputs = (curTheme) => {
  colorInputs.forEach((input) => {
    if (input.dataset.color.match('Alpha')) {
      const color = input.dataset.color.replace('Alpha', '');
      input.value = parseInt(curTheme[color].slice(-2), 16);
      updateBar(input);
    } else if (input.dataset.color === 'modalBg') {
      input.value = curTheme.modalBg.slice(0, -2);
    } else {
      input.value = curTheme[input.dataset.color];
    }
  });
};

const changeInputsState = () => {
  colorInputs.forEach((input) => (input.disabled = user.colorTheme !== 'user'));
};

const changeColor = (input) => {
  if (input.dataset.color.match('Alpha')) {
    changeAlphaColor(input);
  } else if (input.dataset.color === 'modalBg') {
    changeModalBgColor(input);
  } else {
    changeSimpleColor(input);
  }
};

const changeAlphaColor = (input) => {
  updateBar(input);
  const color = input.dataset.color.replace('Alpha', '');
  user.customTheme[color] = user.customTheme[color].slice(0, -2) + parseInt(input.value).toString(16).padStart(2, '0');
  root.style.setProperty(`--color-${color}`, user.customTheme[color]);
};

const changeModalBgColor = (input) => {
  user.customTheme.modalBg = input.value + user.customTheme.modalBg.slice(-2);
  root.style.setProperty(`--color-modalBg`, user.customTheme.modalBg);
};

const changeSimpleColor = (input) => {
  user.customTheme[input.dataset.color] = input.value;
  root.style.setProperty(`--color-${input.dataset.color}`, input.value);
};

const copyColors = () => {
  user.customTheme = Object.assign({}, themes[user.colorTheme]);
  user.colorTheme = 'user';
  colorOption.classList.add('custom');
  userThemeBtn.checked = true;
  changeInputsState();
};

// ------------------------------------------------------

colorOption.addEventListener('input', (e) => changeColor(e.target));
copyBtn.addEventListener('click', copyColors);

export { setTheme, changeTheme };
