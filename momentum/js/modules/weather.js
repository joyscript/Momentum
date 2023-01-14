import { user, saveUser } from './user.js';
import { fetchAndGo } from './service.js';

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const weatherData = document.querySelector('.weather-data');

const defaultCity = { en: 'Minsk', ru: 'Минск' };
const placeholder = { en: '[Enter city]', ru: '[Введите город]' };
const windText = { en: 'Wind speed', ru: 'Скорость ветра' };
const humidText = { en: 'Humidity', ru: 'Влажность' };
const errorText = {
  en: 'No data. Please enter the correct name of&nbsp;the&nbsp;city',
  ru: 'Нет данных.<br> Введите корректное название города',
};

city.value = user.city || defaultCity[user.lang];
city.placeholder = placeholder[user.lang];

const getURL = () => {
  const key = '4bb428ba7924feb431066c5f16731af7';
  return `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${user.lang}&appid=${key}&units=metric`;
};

const changeWeather = (data) => {
  weatherError.textContent = '';
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weatherData.innerHTML = `
  <div><b>${Math.round(data.main.temp)}°C</b> &nbsp; ${data.weather[0].description}</div>
  <div>${windText[user.lang]}: ${Math.round(data.wind.speed)} m/s</div>
  <div>${humidText[user.lang]}: ${Math.round(data.main.humidity)}%</div>
  `;
  user.city = city.value;
  saveUser();
};

const showError = () => {
  weatherData.innerHTML = '';
  weatherIcon.className = 'weather-icon owf';
  weatherError.innerHTML = errorText[user.lang];
};

const checkValue = () => (city.value = isNaN(city.value) ? city.value.trim() : '');

city.addEventListener('change', changeWeather);

export const showWeather = () => {
  checkValue();
  fetchAndGo(getURL(), changeWeather, showError);
};
