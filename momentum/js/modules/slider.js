import { getTimeOfDay } from './timer.js';

export const slider = () => {
  const slider = document.querySelector('.slider');
  const prevBtn = document.querySelector('.slide-prev');
  const nextBtn = document.querySelector('.slide-next');

  let randNum;
  let isReady;

  const getRandNum = (min, max) => (randNum = Math.floor(Math.random() * (max + 1 - min) + min));

  randNum = getRandNum(1, 20);

  const getSlidePrev = () => {
    randNum = --randNum === 0 ? 20 : randNum;
    setBg();
  };

  const getSlideNext = () => {
    randNum = ++randNum === 21 ? 1 : randNum;
    setBg();
  };

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

  const setBg = () => {
    isReady = false;
    const num = randNum > 9 ? randNum : `0${randNum}`;
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/joyscript/stage1-tasks/assets/images/${getTimeOfDay()}/${num}.jpg`;

    img.addEventListener('load', () => startAnimation(img), { once: true });
    img.addEventListener('animationend', () => endAnimation(img), { once: true });

    console.log('Image: ', num);
  };

  setBg();

  prevBtn.addEventListener('click', () => isReady && getSlidePrev());
  nextBtn.addEventListener('click', () => isReady && getSlideNext());
};
