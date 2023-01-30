import { user } from './user.js';
import { fetchAndGo } from './service.js';
import { getRandomInd, showError } from './quote.js';

const mantraBody = document.querySelector('.mantra-body');
const mantraBtn = document.querySelector('.change-mantra-button');

const url = './data/mantra.json';

let curInd = 0;
let curMantra;
let mantras;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const handleData = (data) => {
  mantras = shuffle(data);
  changeMantra(data);
};

const showCurMantra = () => {
  document.querySelector('.mantra-text').textContent = curMantra[user.lang];
};

const changeMantra = () => {
  curMantra = mantras[curInd++ % mantras.length];

  const mantraText = document.createElement('div');
  mantraText.classList.add('mantra-text', 'next');
  mantraText.textContent = curMantra[user.lang];
  mantraBody.append(mantraText);

  mantraText.previousElementSibling.classList.add('prev');
  mantraBody.style.height = mantraText.offsetHeight + 'px';

  mantraText.addEventListener(
    'animationend',
    () => {
      mantraText.previousElementSibling.remove();
      mantraText.classList.remove('next');
    },
    { once: true }
  );
};

const showMantra = () => fetchAndGo(url, handleData, () => showError(mantraBody));

mantraBtn.addEventListener('click', changeMantra);

export { showMantra, showCurMantra };
