import { user } from './user.js';
import { timeOfDay } from './timer.js';
import { fetchAndGo, shuffleArr } from './common.js';
import { tagInput, handleError, goAfterSuccess } from './photo.js';

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');

const unsplashKey = 'XNzUrppnWkjOt4XX7VhMokSfBd-nbanps_7kePh2oeQ';
const flickrKey = '334110c40a5f1c9ae925a64f0815ecee';
const galleries = {
  night: ['72157721528777010', []],
  morning: ['72157721476873279', []],
  afternoon: ['72157721528783175', []],
  evening: ['72157721487545247', []],
  nature: ['72157721489294757', []],
  animals: ['72157721530560185', []],
};

const URL = {
  unsplash: (tag) => `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=${unsplashKey}`,
  github: (num) => {
    const ending = window.innerWidth > 1920 ? `large/${num}.webp` : `${num}.jpg`;
    return `https://raw.githubusercontent.com/joyscript/stage1-tasks/assets/images/${user.photoTag}/${ending}`;
  },
  flickr: (tag) => {
    const beginning = 'https://www.flickr.com/services/rest/?method=flickr';
    const ending = 'extras=url_l,url_h&format=json&nojsoncallback=1';
    return galleries[tag]
      ? `${beginning}.galleries.getPhotos&api_key=${flickrKey}&gallery_id=${galleries[tag]}&${ending}`
      : `${beginning}.photos.search&api_key=${flickrKey}&tags=${tag}&${ending}`;
  },
};

const maxGithub = 20;
let randNum;
let isReady;

const getRandNum = (max) => (randNum = Math.floor(Math.random() * max));
const fitRandNum = (max) => (randNum = (max + randNum) % max);
const formatRandNum = () => (randNum + 1).toString().padStart(2, '0');

if (!user.photoTag) user.photoTag = timeOfDay;
getRandNum(maxGithub);

const startAnimation = (img) => {
  slider.prepend(img);
  img.classList.add('fade-in');
  img.nextElementSibling && img.nextElementSibling.classList.add('fade-out');
};

const endAnimation = (img) => {
  img.nextElementSibling && img.nextElementSibling.remove();
  document.body.classList.remove('animation');
  isReady = true;
};

const animateImage = (img) => {
  isReady = false;
  document.body.classList.add('animation');
  img.addEventListener('load', () => startAnimation(img), { once: true });
  img.addEventListener('animationend', () => endAnimation(img), { once: true });
  console.log(randNum, tagInput.value ? tagInput.value : user.photoTag, img.src);
};

const isGoodPhoto = (photo) => {
  return (photo['url_h'] && photo['width_h'] > photo['height_h']) || (photo['url_l'] && photo['width_l'] > photo['height_l']);
};

const getGoodSize = (image) => (window.innerWidth < 600 ? image['url_l'] : image['url_h'] || image['url_l']);

const getFlickrImage = (data) => {
  const photos = data.photos.photo;

  if (galleries[user.photoTag] && !tagInput.value) {
    const gallery = (galleries[user.photoTag][1] = photos.map((item) => getGoodSize(item)));
    shuffleArr(gallery);
    fitRandNum(gallery.length);
  } else {
    if (data.photos.pages == 1 && photos.length < 50) throw new Error();
    for (let i = 0; i < photos.length; i++) {
      getRandNum(photos.length);
      console.log(i.toString(), randNum, photos[randNum]);
      if (isGoodPhoto(photos[randNum])) break;
    }
    if (!isGoodPhoto(photos[randNum])) throw new Error();
  }
  return getGoodSize(photos[randNum]);
};

const changeApiImage = (data, img) => {
  if (user.photoSource === 'unsplash') data.urls.regular ? (img.src = data.urls.regular) : showBackground();
  if (user.photoSource === 'flickr') img.src = getFlickrImage(data);
  animateImage(img);
  if (tagInput.value) goAfterSuccess();
};

const showBackground = (tag = user.photoTag) => {
  const img = new Image();

  if (user.photoSource === 'github' || (user.photoSource === 'flickr' && galleries[tag] && galleries[tag][1].length)) {
    fitRandNum(user.photoSource === 'github' ? 20 : galleries[tag][1].length);
    img.src = user.photoSource === 'github' ? URL.github(formatRandNum()) : galleries[tag][1][randNum];
    animateImage(img);
  } else {
    fetchAndGo(URL[user.photoSource](tag), (data) => changeApiImage(data, img), handleError);
  }
};

const showAnotherSlide = (i) => {
  if (user.photoSource === 'github' || (user.photoSource === 'flickr' && galleries[user.photoTag])) randNum += i;
  showBackground();
};

// -------------------------------------------------------------------

prevBtn.addEventListener('click', () => isReady && showAnotherSlide(-1));
nextBtn.addEventListener('click', () => isReady && showAnotherSlide(1));

export { showBackground, showAnotherSlide };
