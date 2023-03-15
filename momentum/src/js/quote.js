import { user } from './user.js';
import { fetchAndGo } from './common.js';

const quoteModal = document.querySelector('.quote-modal');

const url = './data/quotes.json';
const errorTexts = {
  en: 'Something went wrong. The content cannot be displayed ',
  ru: 'Что-то пошло не так. Невозможно отобразить контент.',
};

let curInd;
let curQuote;

const getRandomInd = (data) => {
  let i;
  do {
    i = Math.floor(Math.random() * data.length);
  } while (curInd === i);
  return i;
};

const insertContent = (elem) => {
  const keys = [`${user.lang}-text`, `${user.lang}-author`];
  elem.innerHTML = `
    <button class="change-quote-button icon-reload"></button>
    <div class="quote-text">"${curQuote[keys[0]]}"</div>
    <div class="quote-author">${curQuote[keys[1]]}</div>
  `;
};

const removePrevElement = (elem) => {
  elem.previousElementSibling.remove();
  elem.classList.remove('next');
};

const changeQuote = (data) => {
  curInd = getRandomInd(data);
  curQuote = data[curInd];

  const quoteBody = document.createElement('div');
  quoteBody.classList.add('quote-body', 'next');
  insertContent(quoteBody);
  quoteModal.append(quoteBody);
  quoteBody.previousElementSibling.classList.add('prev');
  quoteBody.addEventListener('animationend', () => removePrevElement(quoteBody), { once: true });
};

const showError = (elem) => {
  elem.textContent = errorTexts[user.lang];
  elem.classList.add('error');
};

const showCurQuote = () => insertContent(quoteModal.querySelector('.quote-body'));

const showQuote = () => fetchAndGo(url, changeQuote, () => showError(quoteModal.querySelector('.quote-body')));

quoteModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('change-quote-button')) showQuote();
});

export { showQuote, showCurQuote, removePrevElement, showError };
