import { user } from './user.js';
import { fetchAndGo } from './service.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteBtn = document.querySelector('.change-quote');
const url = './data/quotes.json';
const errorTexts = {
  en: 'Something went wrong. The quote cannot be displayed ',
  ru: 'Что-то пошло не так. Невозможно отобразить цитату.',
};

let count = 0;
let curQuote;

const showCurQuote = () => {
  quote.textContent = `"${curQuote[user.lang == 'en' ? 'text' : 'текст']}"`;
  author.textContent = curQuote[user.lang == 'en' ? 'author' : 'автор'];
};

const showError = () => (quote.textContent = errorTexts[user.lang]);

const rotateBtn = () => (quoteBtn.style.transform = `rotate(${count++ * 180}deg)`);

const changeQuote = (data) => {
  curQuote = data[Math.floor(Math.random() * data.length)];
  showCurQuote();
  rotateBtn();
};

const showQuote = () => fetchAndGo(url, changeQuote, showError);

quoteBtn.addEventListener('click', showQuote);

export { showQuote, showCurQuote };
