import { audioData } from './audioData.js';

export const showPlayer = () => {
  const playBtn = document.querySelector('.play');
  const prevBtn = document.querySelector('.play-prev');
  const nextBtn = document.querySelector('.play-next');
  const playList = document.querySelector('.play-list');
  
  const audio = new Audio();

  let isPlaying = false;
  let num = 0;

  const createPlayList = (item) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;
    playList.append(li);
  };

  audioData.forEach((item) => createPlayList(item));

  const playAudio = () => {
    num = (audioData.length + num) % audioData.length;
    audio.src = audioData[num].src;
    audio.currentTime = 0;
    audio.play();
    activateItem();
    isPlaying = true;
    playBtn.classList.add('pause');
    audio.addEventListener('ended', () => playAudio(++num), { once: true });
  };

  const pauseAudio = () => {
    audio.pause();
    isPlaying = false;
    playBtn.classList.remove('pause');
  };

  const toggleAudio = () => (isPlaying ? pauseAudio() : playAudio());

  const activateItem = () => {
    if (playList.querySelector('.active')) playList.querySelector('.active').classList.remove('active');
    playList.children[num].classList.add('active');
  };

  playBtn.addEventListener('click', () => toggleAudio());
  prevBtn.addEventListener('click', () => playAudio(--num));
  nextBtn.addEventListener('click', () => playAudio(++num));
};
