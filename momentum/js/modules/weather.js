import { user } from './user.js';
import { fetchAndGo } from './common.js';

const weather = document.querySelector('.weather');
const weatherMain = weather.querySelector('.weather-main');
const weatherData = weather.querySelector('.weather-data');
const city = weather.querySelector('.city-input');

const defaultCity = { en: 'Minsk', ru: 'Минск' };
const placeholder = { en: '[Enter city]', ru: '[Введите город]' };
const windText = { en: 'Wind speed', ru: 'Скорость ветра' };
const humidText = { en: 'Humidity', ru: 'Влажность' };
const errorText = {
  en: 'No data. Please enter the correct name of&nbsp;the&nbsp;city',
  ru: 'Нет данных. Введите корректное название города',
};

const getURL = () => {
  const key = '4bb428ba7924feb431066c5f16731af7';
  return `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${user.lang}&appid=${key}&units=metric`;
};

const renderWeather = (data) => {
  weather.classList.remove('error');
  weatherMain.innerHTML = `
    <i class="weather-icon owf owf-${data.weather[0].id}"></i>
    <span class="weather-temp">${Math.round(data.main.temp)}°C</span>
  `;
  weatherData.innerHTML = `
    <span>${data.weather[0].description}</span>
    <span>${humidText[user.lang]}: ${Math.round(data.main.humidity)}%</span>
    <span>${windText[user.lang]}: ${Math.round(data.wind.speed)} m/s</span>
  `;
};

const renderError = () => {
  weather.classList.add('error');
  weatherData.innerHTML = errorText[user.lang];
};

const checkCityValue = () => {
  city.value = isNaN(city.value) ? city.value.trim() : '';
  if (city.value) city.value = city.value[0].toUpperCase() + city.value.slice(1);
  user.city = city.value;
};

const changeWeather = () => {
  checkCityValue();
  fetchAndGo(getURL(), renderWeather, renderError);
};

const showWeather = () => {
  city.value = user.city || defaultCity[user.lang];
  city.placeholder = placeholder[user.lang];
  fetchAndGo(getURL(), renderWeather, renderError);
};

city.addEventListener('change', changeWeather);

export { showWeather };
