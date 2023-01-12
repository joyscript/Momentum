import { fetchAndGo } from './service.js';

export const quote = () => {
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  const quoteBtn = document.querySelector('.change-quote');
  const url = './data/data.json';
  let count = 0;

  const showQuote = (data) => {
    const randNum = Math.floor(Math.random() * data.length);
    quote.textContent = `"${data[randNum].text}"`;
    author.textContent = data[randNum].author;
    rotateBtn();
  };

  const rotateBtn = () => (quoteBtn.style.transform = `rotate(${count++ * 180}deg)`);

  fetchAndGo(url, showQuote);

  quoteBtn.addEventListener('click', () => fetchAndGo(url, showQuote));
};
