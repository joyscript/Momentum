import { timeOfDay } from './timer.js';

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');
const max = 20;

let randNum = Math.floor(Math.random() * max + 1);
let isReady;

const startAnimation = (img) => {
  slider.prepend(img);
  img.classList.add('fade-in');
  img.nextElementSibling && img.nextElementSibling.classList.add('fade-out');
  [prevBtn, nextBtn].forEach((btn) => btn.classList.add('disabled'));
};

const endAnimation = (img) => {
  img.nextElementSibling && img.nextElementSibling.remove();
  [prevBtn, nextBtn].forEach((btn) => btn.classList.remove('disabled'));
  isReady = true;
};

 const showSlide = (num) => {
  isReady = false;

  num = (max + num) % max;
  num = `${num < 9 ? '0' : ''}${num + 1}`;

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/joyscript/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg`;

  img.addEventListener('load', () => startAnimation(img), { once: true });
  img.addEventListener('animationend', () => endAnimation(img), { once: true });

  console.log('Image: ', num);
};

prevBtn.addEventListener('click', () => isReady && showSlide(--randNum));
nextBtn.addEventListener('click', () => isReady && showSlide(++randNum));

export const showBackground = () => showSlide(randNum);