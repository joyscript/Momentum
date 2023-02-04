import { timeOfDay } from './timer.js';

let user = {
  name: '',
  city: '',
  lang: 'en',
  photoSource: 'github',
  photoTag: timeOfDay,
  customTag: '',
  tagMode: '',
  showBlock: {
    time: true,
    date: true,
    greeting: true,
    weather: true,
    quote: true,
    player: true,
    todo: true,
    mantra: true,
    arrows: true,
  },
  player: {
    volume: 0.4,
    mute: false,
    song: 0,
    time: 0,
    listOpen: false,
  },
  todoList: [],
  todoShow: 'all',
  menu: 'general',
  colorTheme: 'dark',
  customTheme: '',
};

const key = 'user-momentum-joyscript';

const getUser = () => (localStorage[key] ? (user = JSON.parse(localStorage[key])) : localStorage.clear());

const saveUser = () => localStorage.setItem(key, JSON.stringify(user));

getUser();

export { user, getUser, saveUser };
