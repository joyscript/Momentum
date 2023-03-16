import { user, saveUser } from './user.js';
import { decorateTimer } from './timer.js';
import { loadTodo, saveTodo } from './todo.js';
import { setTheme, changeTheme } from './colors.js';
import { changePhoto, changePhotoSourse } from './photo.js';
import { btnInputs, translateModals, changeLanguage } from './trans.js';

const menu = document.querySelector('.menu');
const blocks = document.querySelectorAll('[data-show]');
const menuParts = menu.querySelectorAll('.menu-part');
const modalToggleBtns = document.querySelectorAll('.modal-toggle-button');

const showBlocks = () => {
  blocks.forEach((block) => {
    user.showBlock[block.dataset.show] ? block.classList.add('show') : block.classList.remove('show');
  });
};

const changeMenuPart = () => {
  menuParts.forEach((part) => {
    part.dataset.menu === user.menu ? part.classList.add('active') : part.classList.remove('active');
  });
};

const changeBtns = () => {
  btnInputs.forEach((input) => {
    input.checked = input.name === 'showBlock' ? user.showBlock[input.value] : user[input.name] === input.value;
  });
};

const menuHandlers = {
  menu: changeMenuPart,
  lang: changeLanguage,
  showBlock: showBlocks,
  effect: decorateTimer,
  photoTag: changePhoto,
  photoSource: changePhotoSourse,
  colorTheme: changeTheme,
};

const handleMenuClicks = (e) => {
  if (!e.target.matches('.modal-button > input') || e.target.closest('.autoslider-button')) return;
  const input = e.target;
  input.name === 'showBlock' ? (user.showBlock[input.value] = input.checked) : (user[input.name] = input.value);
  menuHandlers[input.name]();
};

const toggleModal = (modal) => {
  modal.classList.toggle('open');

  const closeModal = (e) => {
    if (!e.target.closest(`.${modal.dataset.modal}`)) {
      modal.classList.remove('open');
      document.body.removeEventListener('click', closeModal);
    }
  };

  if (modal.classList.contains('open')) document.body.addEventListener('click', closeModal);
};

const setSettings = () => {
  showBlocks();
  translateModals();
  changeMenuPart();
  changeBtns();
  setTheme();
  loadTodo();
};

const saveSettings = () => {
  saveTodo();
  saveUser();
};

// -----------------------------------------------------------------------

menu.addEventListener('click', handleMenuClicks);

modalToggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => toggleModal(btn.parentElement));
});

window.addEventListener('beforeunload', saveSettings);

export { setSettings };
