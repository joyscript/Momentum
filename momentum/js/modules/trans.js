import { user } from './user.js';
import { showWeather } from './weather.js';
import { showTagError } from './photo.js';
import { showCurQuote } from './quote.js';
import { showCurMantra } from './mantra.js';
import { showDateAndGreeting } from './timer.js';
import { changeAutosliderText } from './autoslider.js';

const transItems = document.querySelectorAll('[data-trans]');
const btnInputs = document.querySelectorAll('.modal-button input');
const textInputs = document.querySelectorAll('.modal-input');

const transText = {
  // TransItems ----------------
  language: ['Language', 'Язык'],
  showBlocks: ['Show / hide', 'Показать / скрыть'],
  music: ['Music', 'Музыка'],
  photoSourse: ['Photo sourse', 'Фото ресурс'],
  photoTags: ['Photo tags', 'Фото тег'],
  customTag: ['Custom tag', 'Личный тег'],
  autoslider: ['Autoslider', 'Автослайдер'],
  sliderMessage: ['Available for GitHub and Flickr', 'Доступен для GitHub и Flickr'],
  speed: ['Speed', 'Скорость'],
  customColors: ['Сustomize colors', 'Настройте цвета'],
  copyColors: ['Copy these colors to your theme', 'Скопируйте цвета в свою тему'],
  activeColor: ['Active color', 'Активный цвет'],
  background: ['Modal background', 'Фон модальных окон'],
  bgOpacity: ['Background opacity', 'Прозрачность фона'],
  modalText: ['Modal text', 'Текст модальных окон'],
  btnText: ['Active button text', 'Текст активных кнопок'],
  overlay: ['Overlay opacity', 'Затемнение фона'],
  theme: ['Theme', 'Тема'],
  effects: ['Timer decoration', 'Украшение таймера'],
  todoText: ['No todos yet', 'Еще нет задач'],
  doneText: ['No completed todos', 'Нет выполненных задач'],
  clearBtn: ['Clear list', 'Очистить'],

  // ModalBtns ----------------
  general: ['General', 'Общее'],
  photo: ['Photo', 'Фото'],
  style: ['Style', 'Стиль'],
  en: ['English', 'Англ.'],
  ru: ['Russian', 'Русский'],
  time: ['Time', 'Время'],
  date: ['Date', 'Дата'],
  greeting: ['Name', 'Имя'],
  weather: ['Weather', 'Погода'],
  quote: ['Quote', 'Цитата'],
  player: ['Player', 'Плеер'],
  todo: ['Todo', 'Задачи'],
  mantra: ['Mantra', 'Мантра'],
  arrows: ['Arrows', 'Стрелки'],
  gradient: ['Gradient', 'Градиент'],
  glow: ['Glow', 'Сияние'],
  none: ['None', 'Нет'],
  github: ['GitHub', 'GitHub'],
  unsplash: ['Unsplash', 'Unsplash'],
  flickr: ['Flickr', 'Flickr'],
  night: ['Night', 'Ночь'],
  morning: ['Morning', 'Утро'],
  afternoon: ['Afternoon', 'День'],
  evening: ['Evening', 'Вечер'],
  nature: ['Nature', 'Природа'],
  animals: ['Animals', 'Животные'],
  custom: ['Your tag', 'Ваш тег'],
  dark: ['Dark', 'Темная'],
  light: ['Light', 'Светлая'],
  user: ['Custom', 'Личная'],
  all: ['All', 'Все'],
  done: ['Done', 'Выполнены'],

  // textInputs ----------------
  tagInput: ['[Enter your tag]', '[Введите ваш тег]'],
  sliderInput: ['[Enter speed, 3 - 99 s]', '[Введите скорость, 3-99s]'],
  todoInput: ['[Enter new todo]', '[Введите новую задачу]'],
};

const translateModals = () => {
  const ind = user.lang === 'en' ? 0 : 1;
  transItems.forEach((item) => (item.textContent = transText[item.dataset.trans][ind]));
  textInputs.forEach((input) => (input.placeholder = transText[input.name][ind]));
  btnInputs.forEach((input) => {
    input.nextElementSibling.textContent = transText[input.value] ? transText[input.value][ind] : input.value;
  });
  changeAutosliderText();
};

const changeLanguage = () => {
  translateModals();
  showDateAndGreeting();
  showWeather();
  showCurQuote();
  showCurMantra();
  showTagError();
};

export { btnInputs, translateModals, changeLanguage };
