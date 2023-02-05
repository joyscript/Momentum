import { user } from './user.js';
import { updateBar } from './service.js';
import { audioData } from './audioData.js';

const player = document.querySelector('.player');
const playList = player.querySelector('.play-list');
const playBtn = player.querySelector('.icon-play');
const prevBtn = player.querySelector('.icon-play-prev');
const nextBtn = player.querySelector('.icon-play-next');
const volumeBtn = player.querySelector('.icon-volume');
const songName = player.querySelector('.song-name');
const curTime = player.querySelector('.current-time');
const duration = player.querySelector('.duration');
const progressBar = player.querySelector('.progress-bar');
const volumeBar = player.querySelector('.volume-bar');
const playlistBtn = player.querySelector('.playlist-button');

const audio = new Audio();
let isPlaying = false;
let num = 0;

const createPlayList = (item) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.innerHTML = `<span class='icon-play'></span><span class='song-title'>${item.title}</span>`;
  playList.append(li);
};

const playAudio = () => {
  audio.play();
  isPlaying = true;
  [playBtn, playList.children[num]].forEach((item) => item.classList.add('playing'));
};

const pauseAudio = () => {
  audio.pause();
  isPlaying = false;
  [playBtn, playList.children[num]].forEach((item) => item.classList.remove('playing'));
};

const toggleAudio = () => (isPlaying ? pauseAudio() : playAudio());

const activateTitle = () => {
  if (playList.querySelector('.active')) playList.querySelector('.active').classList.remove('active');
  playList.children[num].classList.add('active');
};

const playNewAudio = (i) => {
  if (i) {
    pauseAudio();
    num = (audioData.length + num + i) % audioData.length;
  }
  audio.src = audioData[num].src;
  user.player.song = num;
  activateTitle();
  playAudio();
};

const showData = () => {
  songName.textContent = audioData[num].title;
  duration.textContent = formatTime(audio.duration);
};

const showCurTime = () => (curTime.textContent = formatTime(audio.currentTime));

const formatTime = (sec) => {
  const min = Math.floor(sec / 60);
  sec = Math.floor(sec % 60).toString();
  return `${min}:${sec.padStart(2, 0)}`;
};

const changeVolume = () => {
  audio.volume = volumeBar.value / 100;
  audio.volume === 0 ? volumeBtn.classList.add('mute') : volumeBtn.classList.remove('mute');
  if (!user.player.mute) user.player.volume = audio.volume;
  updateBar(volumeBar);
};

const toggleVolume = () => {
  volumeBtn.classList.toggle('mute');
  if (volumeBtn.classList.contains('mute')) {
    audio.volume = 0;
    user.player.mute = true;
  } else {
    audio.volume = user.player.volume;
    user.player.mute = false;
  }
  volumeBar.value = audio.volume * 100;
  updateBar(volumeBar);
};

const changeTime = () => {
  audio.currentTime = audio.duration * (progressBar.value / 100);
  updateBar(progressBar);
};

const updateProgress = () => {
  progressBar.value = audio.currentTime === 0 ? 0 : (audio.currentTime / audio.duration) * 100;
  user.player.time = audio.currentTime;
  updateBar(progressBar);
  showCurTime();
};

const playChosenAudio = (e) => {
  if (!e.target.closest('.play-item')) return;
  const ind = audioData.findIndex((item) => item.title === e.target.closest('.play-item').textContent);
  if (num === ind) {
    toggleAudio();
  } else {
    pauseAudio();
    num = ind;
    playNewAudio();
  }
};

const togglePlaylist = () => {
  player.classList.toggle('playlist-open');

  if (player.classList.contains('playlist-open')) {
    playList.style.height = playList.scrollHeight + 30 + 'px';
    setTimeout(() => playList.classList.add('scroll'), 300);
  } else {
    playList.style.height = '';
    playList.classList.remove('scroll');
  }
  user.player.listOpen = player.classList.contains('playlist-open');
};

// -------------------------------------------------------

export const showPlayer = () => {
  audioData.forEach((item) => createPlayList(item));
  num = user.player.song;
  audio.src = audioData[num].src;
  audio.currentTime = user.player.time;
  volumeBar.value = user.player.mute ? 0 : user.player.volume * 100;
  activateTitle();
  changeVolume();
  updateProgress();
  user.player.listOpen && togglePlaylist();
};

audio.addEventListener('loadedmetadata', showData);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => playNewAudio(1));
nextBtn.addEventListener('click', () => playNewAudio(1));
prevBtn.addEventListener('click', () => playNewAudio(-1));
playlistBtn.addEventListener('click', togglePlaylist);
playList.addEventListener('click', playChosenAudio);
playBtn.addEventListener('click', toggleAudio);
volumeBtn.addEventListener('click', toggleVolume);
volumeBar.addEventListener('input', changeVolume);
progressBar.addEventListener('input', changeTime);
