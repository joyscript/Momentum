let user = {
  name: '',
  city: '',
  lang: 'en',
  menu: 'general',
  photoSource: 'github',
  photoTag: '',
  customTag: '',
  showBlock: {
    time: true,
    date: true,
    greeting: true,
    weather: true,
    quote: true,
    player: true,
    todo: true,
    mantra: false,
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
  colorTheme: 'dark',
  customTheme: '',
  sliderSpeed: '3',
};

const key = 'user-momentum-joyscript';

const getUser = () => (localStorage[key] ? (user = JSON.parse(localStorage[key])) : localStorage.clear());

const saveUser = () => localStorage.setItem(key, JSON.stringify(user));

getUser();

export { user, saveUser };
