import { user } from './user.js';
import { updateBar } from './common.js';

const root = document.querySelector(':root');
const colorOption = document.querySelector('.color-option');
const colorInputs = colorOption.querySelectorAll('input[data-color]');
const copyBtn = colorOption.querySelector('.copy-button');

const themes = {
  dark: {
    active: '#ce51f5',
    modal: '#ffffff',
    modalBg: '#09031599',
    activeBtn: '#ffffff',
  },
  light: {
    active: '#419cf1',
    modal: '#303030',
    modalBg: '#ffffffdd',
    activeBtn: '#ffffff',
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

const changeInputsState = () => {
  colorInputs.forEach((input) => (input.disabled = user.colorTheme !== 'user'));
};

const changeColor = (input) => {
  input.dataset.color.match('Bg') ? changeModalBgColor(input) : changeSimpleColor(input);
};

const changeModalBgColor = (input) => {
  let modalBg = user.customTheme.modalBg;
  if (input.dataset.color === 'alphaBg') {
    updateBar(input);
    modalBg = modalBg.slice(0, -2) + parseInt(input.value).toString(16).padStart(2, '0');
  } else {
    modalBg = input.value + user.customTheme.modalBg.slice(-2);
  }
  root.style.setProperty(`--color-modalBg`, modalBg);
  user.customTheme.modalBg = modalBg;
};

const changeSimpleColor = (input) => {
  user.customTheme[input.dataset.color] = input.value;
  root.style.setProperty(`--color-${input.dataset.color}`, input.value);
};

const copyColors = () => {
  user.customTheme = Object.assign({}, themes[user.colorTheme]);
  user.colorTheme = 'user';
  colorOption.classList.add('custom');
  changeInputsState();
};

// ------------------------------------------------------

colorOption.addEventListener('input', (e) => changeColor(e.target));
copyBtn.addEventListener('click', copyColors);

export { setTheme, changeTheme };
