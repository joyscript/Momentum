let user = {
  name: '',
  city: '',
  lang: 'en',
  photoSource: 'github',
  tag: 'cats',
  showBlock: {
    time: true,
    date: true,
    greeting: true,
    weather: true,
    quote: true,
    player: false,
  },
};

const key = 'user-momentum-joyscript';

const getUser = () => (localStorage[key] ? (user = JSON.parse(localStorage[key])) : localStorage.clear());

const saveUser = () => localStorage.setItem(key, JSON.stringify(user));

export { user, getUser, saveUser };
