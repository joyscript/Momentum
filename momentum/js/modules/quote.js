import { user } from './user.js';
import { fetchAndGo } from './service.js';

const quoteModal = document.querySelector('.quote-modal');

const url = './data/quotes.json';
const errorTexts = {
  en: 'Something went wrong. The content cannot be displayed ',
  ru: 'Что-то пошло не так. Невозможно отобразить контент.',
};

let curInd;
let curQuote;

const getRandomInd = (itemInd, data) => {
  let i;
  do {
    i = Math.floor(Math.random() * data.length);
  } while (itemInd === i);
  return i;
};

const insertContent = (elem) => {
  const keys = [`${user.lang}-text`, `${user.lang}-author`];
  elem.innerHTML = `
    <button class="button change-quote-button"></button>
    <div class="quote-text">"${curQuote[keys[0]]}"</div>
    <div class="quote-author">${curQuote[keys[1]]}</div>
  `;
};

const changeQuote = (data) => {
  curInd = getRandomInd(curInd, data);
  curQuote = data[curInd];

  const quoteBody = document.createElement('div');
  quoteBody.classList.add('quote-body', 'next');
  insertContent(quoteBody);
  quoteModal.prepend(quoteBody);
  quoteBody.nextElementSibling.classList.add('prev');

  quoteBody.addEventListener(
    'animationend',
    () => {
      quoteBody.nextElementSibling.remove();
      quoteBody.classList.remove('next');
    },
    { once: true }
  );
};

const showError = (elem) => {
  elem.textContent = errorTexts[user.lang];
  elem.classList.add('error');
};

const showCurQuote = () => insertContent(quoteModal.querySelector('.quote-body'));

const showQuote = () => fetchAndGo(url, changeQuote, () => showError(quoteModal.querySelector('.quote-body')));

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('change-quote-button')) showQuote();
});

export { showQuote, showCurQuote, getRandomInd, showError };
