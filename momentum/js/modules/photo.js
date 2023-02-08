import { user } from './user.js';
import { timeOfDay } from './timer.js';
import { checkValue } from './common.js';
import { showBackground } from './slider.js';

const photoPart = document.querySelector('[data-menu="photo"]');
const customBlock = photoPart.querySelector('.custom-block');
const tagInput = photoPart.querySelector('.tag-input');
const tagError = photoPart.querySelector('.tag-error');
const customBtn = photoPart.querySelector('.custom-input');
const githubBtn = photoPart.querySelector('[value="github"]');

const errors = {
  en: ['Sorry, there are no such images', 'API is not responding now, try later'],
  ru: ['Извините, нет таких изображений', 'API не отвечает, попробуйте позже.'],
};

photoPart.dataset.source = user.photoSource;
customBtn.disabled = !user.customTag;
customBtn.value = user.customTag || 'custom';

const changePhoto = () => {
  if (customBlock.classList.contains('error')) clearCustomBlock();
  if (!document.body.classList.contains('autoslider-play')) showBackground();
};

const changePhotoSourse = () => {
  if (user.photoSource === 'github') changeGithubTag();
  photoPart.dataset.source = user.photoSource;
  changePhoto();
};

const changeGithubTag = () => {
  user.photoTag = timeOfDay;
  photoPart.querySelector(`[value="${timeOfDay}"]`).checked = true;
};

const clearCustomBlock = () => {
  customBlock.classList.remove('error');
  tagInput.value = '';
};

const addCustomTag = () => {
  tagInput.value = checkValue(tagInput.value);
  if (!tagInput.value) return;
  showBackground(tagInput.value);
  tagInput.blur();
};

const goAfterSuccess = () => {
  user.photoTag = user.customTag = tagInput.value;
  animateInput();
  changeCustomButton();
};

const animateInput = () => {
  tagInput.classList.add('anim');
  setTimeout(() => (tagInput.value = ''), 400);
  tagInput.addEventListener('animationend', () => tagInput.classList.remove('anim'), { once: true });
};

const changeCustomButton = () => {
  if (customBtn.disabled) customBtn.disabled = false;
  customBtn.checked = true;
  customBtn.nextElementSibling.textContent = customBtn.value = tagInput.value;
};

const handleError = () => {
  if (!tagInput.value && user.photoSource !== 'github') goToGithub();
  customBlock.classList.add('error');
  showTagError();
};

const goToGithub = () => {
  photoPart.dataset.source = user.photoSource = 'github';
  githubBtn.checked = true;
  changeGithubTag();
};

const showTagError = () => (tagError.textContent = errors[user.lang][tagInput.value ? 0 : 1]);

const watchTagInput = () => {
  if (!tagInput.value.match(/^[a-zA-Zа-яА-Я]*$/)) tagInput.value = tagInput.value.slice(0, -1);
  !tagInput.value && customBlock.classList.remove('error');
};

// -------------------------------------------

tagInput.addEventListener('change', addCustomTag);
tagInput.addEventListener('input', watchTagInput);

export { tagInput, changePhoto, changePhotoSourse, goAfterSuccess, handleError, showTagError };
