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
  },
  todoList: [],
  todoShow: 'all',
  playerVolume: 0.4,
  playerMute: false,
  playerSong: 0,
  playerTime: 0,
  playlistOpen: false,
};

const key = 'user-momentum-joyscript';

const getUser = () => (localStorage[key] ? (user = JSON.parse(localStorage[key])) : localStorage.clear());

const saveUser = () => localStorage.setItem(key, JSON.stringify(user));

getUser();

export { user, getUser, saveUser };
