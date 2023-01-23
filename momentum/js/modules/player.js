import { user, saveUser } from './user.js';
import { audioData } from './audioData.js';

export const showPlayer = () => {
  const player = document.querySelector('.player');
  const playList = player.querySelector('.play-list');
  const playBtn = player.querySelector('.play');
  const prevBtn = player.querySelector('.play-prev');
  const nextBtn = player.querySelector('.play-next');
  const volumeBtn = player.querySelector('.volume');
  const songName = player.querySelector('.song-name');
  const curTime = player.querySelector('.current-time');
  const duration = player.querySelector('.duration');
  const progressBar = player.querySelector('.progress-bar');
  const volumeBar = player.querySelector('.volume-bar');

  const audio = new Audio();
  let isPlaying = false;
  let num = user.playerSong;

  const createPlayList = (item) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;
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
    if (i) num = (audioData.length + num + i) % audioData.length;
    audio.src = audioData[num].src;
    user.playerSong = num;
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

  const updateBar = (bar) => (bar.style.backgroundSize = `${bar.value}% 100%`);

  const changeVolume = () => {
    audio.volume = volumeBar.value / 100;
    audio.volume === 0 ? volumeBtn.classList.add('mute') : volumeBtn.classList.remove('mute');
    if (!user.playerMute) user.playerVolume = audio.volume;
    updateBar(volumeBar);
  };

  const toggleVolume = () => {
    volumeBtn.classList.toggle('mute');
    if (volumeBtn.classList.contains('mute')) {
      audio.volume = 0;
      user.playerMute = true;
    } else {
      audio.volume = user.playerVolume;
      user.playerMute = false;
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
    user.playerTime = audio.currentTime;
    updateBar(progressBar);
    showCurTime();
  };

  const playChosenAudio = (e) => {
    if (!e.target.classList.contains('play-item')) return;
    const ind = audioData.findIndex((item) => item.title === e.target.textContent);
    if (num === ind) {
      toggleAudio();
    } else {
      num = ind;
      playNewAudio();
    }
  };

  // -------------------------------------------------------

  audioData.forEach((item) => createPlayList(item));

  audio.src = audioData[num].src;
  audio.currentTime = user.playerTime;
  volumeBar.value = user.playerMute ? 0 : user.playerVolume * 100;
  activateTitle();
  changeVolume();
  updateProgress();

  audio.addEventListener('loadedmetadata', showData);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', () => playNewAudio(1));
  nextBtn.addEventListener('click', () => playNewAudio(1));
  prevBtn.addEventListener('click', () => playNewAudio(-1));
  playList.addEventListener('click', playChosenAudio);
  playBtn.addEventListener('click', toggleAudio);
  volumeBtn.addEventListener('click', toggleVolume);
  volumeBar.addEventListener('input', changeVolume);
  progressBar.addEventListener('input', changeTime);
  // window.addEventListener('beforeunload', saveUser);
};
