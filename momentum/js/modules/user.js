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
  },
  todoList: {},
  todoShow: 'all',
  todoID: 0,
  playerVolume: 0.4,
  playerMute: false,
  playerSong: 0,
  playerTime: 0,
};

const key = 'user-momentum-joyscript';

const getUser = () => (localStorage[key] ? (user = JSON.parse(localStorage[key])) : localStorage.clear());

const saveUser = () => localStorage.setItem(key, JSON.stringify(user));

getUser();

export { user, getUser, saveUser };
