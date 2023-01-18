import { timeOfDay } from './timer.js';

let user = {
  name: '',
  city: '',
  lang: 'en',
  photoSource: 'github',
  photoTag: timeOfDay,
  showBlock: {
    time: true,
    date: true,
    greeting: true,
    weather: true,
    quote: true,
    player: false,
  },
  todoList: {},
  todoShow: 'all',
  todoID: 0,
};

const key = 'user-momentum-joyscript';

const getUser = () => (localStorage[key] ? (user = JSON.parse(localStorage[key])) : localStorage.clear());

const saveUser = () => localStorage.setItem(key, JSON.stringify(user));

getUser();

// ------------------------------------------

const transText = {
  language: ['Language', 'Язык'],
  photoSourse: ['Photo sourse', 'Фото ресурс'],
  photoTags: ['Photo tags', 'Фото тег'],
  showBlocks: ['Show / hide', 'Показать / скрыть'],
  todoText: ['No todos yet', 'Еще нет задач'],
  doneText: ['No completed todos', 'Нет выполненных задач'],
  tag: ['Enter your tag', 'Введите ваш тег'],
  todo: ['Enter new todo', 'Введите новую задачу'],
  en: ['English', 'Англ.'],
  ru: ['Russian', 'Русский'],
  github: ['GitHub', 'GitHub'],
  unsplash: ['Unsplash', 'Unsplash'],
  flickr: ['Flickr', 'Flickr'],
  night: ['Night', 'Ночь'],
  morning: ['Morning', 'Утро'],
  afternoon: ['Afternoon', 'День'],
  evening: ['Evening', 'Вечер'],
  animals: ['Animals', 'Животные'],
  beauty: ['Beauty', 'Красота'],
  time: ['Time', 'Время'],
  date: ['Date', 'Дата'],
  greeting: ['Name', 'Имя'],
  weather: ['Weather', 'Погода'],
  quote: ['Quote', 'Цитата'],
  player: ['Player', 'Плеер'],
  all: ['All', 'Все'],
  done: ['Done', 'Выполнены'],
};

export { user, getUser, saveUser, transText };
