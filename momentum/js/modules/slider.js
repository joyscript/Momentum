import { user } from './user.js';
import { fetchAndGo } from './service.js';
import { handleError, goAfterSuccess } from './settings.js';

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');

const unsplashKey = 'XNzUrppnWkjOt4XX7VhMokSfBd-nbanps_7kePh2oeQ';
const flickrKey = '334110c40a5f1c9ae925a64f0815ecee';

const URL = {
  github: (num) => `https://raw.githubusercontent.com/joyscript/stage1-tasks/assets/images/${user.photoTag}/${num}.jpg`,
  unsplash: (tag) => `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=${unsplashKey}`,
  flickr: (tag) =>
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`,
};

const maxGithub = 20;
let randNum;
let isReady;

const getRandNum = (max) => (randNum = Math.floor(Math.random() * max + 1));
if (user.photoSource === 'github') getRandNum(maxGithub);

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

const animateImage = (img) => {
  img.addEventListener('load', () => startAnimation(img), { once: true });
  img.addEventListener('animationend', () => endAnimation(img), { once: true });
  console.log(randNum, 'Image: ', img.src);
};

const formatRandNum = () => {
  let num = (maxGithub + randNum) % maxGithub;
  return `${num < 9 ? '0' : ''}${num + 1}`;
};

const showAnotherSlide = (i) => {
  if (user.photoSource === 'github') randNum += i;
  showBackground();
};

const changeImage = (data, img) => {
  if (user.photoSource === 'unsplash') {
    data.urls.regular ? (img.src = data.urls.regular) : showBackground();
  }

  if (user.photoSource === 'flickr') {
    const photos = data.photos.photo;
    if (!photos.length) throw new Error();

    do {
      getRandNum(photos.length - 1);
    } while (!(photos[randNum]['url_l'] && photos[randNum]['width_l'] > photos[randNum]['height_l']));
    img.src = photos[randNum]['url_l'];
  }
  animateImage(img);
  if (user.tagMode === 'custom') goAfterSuccess();
};

export const showBackground = (tag = user.photoTag) => {
  isReady = false;
  const img = new Image();

  if (user.photoSource === 'github') {
    img.src = URL.github(formatRandNum());
    animateImage(img);
  } else {
    fetchAndGo(URL[user.photoSource](tag), (data) => changeImage(data, img), handleError);
  }
};

prevBtn.addEventListener('click', () => isReady && showAnotherSlide(-1));
nextBtn.addEventListener('click', () => isReady && showAnotherSlide(1));

document.addEventListener('keydown', (e) => {
  if (e.target.tagName !== 'INPUT' && e.target.contentEditable !== 'true') {
    if (e.code === 'ArrowLeft') isReady && showAnotherSlide(-1);
    if (e.code === 'ArrowRight') isReady && showAnotherSlide(1);
  }
});
