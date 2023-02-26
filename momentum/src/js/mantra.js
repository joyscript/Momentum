import { user } from './user.js';
import { fetchAndGo, shuffleArr } from './common.js';
import { removePrevElement, showError } from './quote.js';

const mantraBody = document.querySelector('.mantra-body');
const mantraBtn = document.querySelector('.change-mantra-button');

const url = './data/mantra.json';

let curInd = 0;
let curMantra;
let mantras;

const handleData = (data) => {
  mantras = shuffleArr(data);
  changeMantra(data);
};

const showCurMantra = () => {
  mantraBody.querySelector('.mantra-text').textContent = curMantra[user.lang];
};

const changeMantra = () => {
  curMantra = mantras[curInd++ % mantras.length];

  const mantraText = document.createElement('div');
  mantraText.classList.add('mantra-text', 'next');
  mantraText.textContent = curMantra[user.lang];
  mantraBody.append(mantraText);
  mantraText.previousElementSibling.classList.add('prev');
  mantraBody.style.height = mantraText.offsetHeight + 'px';
  mantraText.addEventListener('animationend', () => removePrevElement(mantraText), { once: true });
};

const showMantra = () => fetchAndGo(url, handleData, () => showError(mantraBody));

mantraBtn.addEventListener('click', changeMantra);

export { showMantra, showCurMantra };
