export const weather = () => {
  const lang = 'en';
  const defaultCity = 'Minsk';
  const placeholders = ['[Enter city]', '[Введите город]'];

  const city = document.querySelector('.city');
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherError = document.querySelector('.weather-error');
  const weatherData = document.querySelector('.weather-data');

  const showWeather = (data) => {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherData.innerHTML = `
      <div><b>${Math.round(data.main.temp)}°C</b> &nbsp; ${data.weather[0].description}</div>
      <div>Wind speed: ${Math.round(data.wind.speed)} m/s</div>
      <div>Humidity: ${Math.round(data.main.humidity)}%</div>
    `;
  };

  const showError = () => {
    weatherData.innerHTML = '';
    weatherIcon.className = 'weather-icon owf';
    weatherError.innerHTML = 'No data. Please enter the correct name of&nbsp;the&nbsp;city';
  };

  const getWeather = async () => {
    const key = '4bb428ba7924feb431066c5f16731af7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=${key}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const data = await res.json();
      showWeather(data);
    } catch (err) {
      showError();
    }
  };

  const updateCity = () => (city.value = localStorage.getItem('city') || defaultCity);

  const updatePlaceholder = () => (city.placeholder = placeholders[0]);

  const checkValue = () => (city.value = isNaN(city.value) ? city.value.trim() : '');

  const saveCity = () => localStorage.setItem('city', city.value);

  const updateWeather = () => {
    checkValue();
    saveCity();
    getWeather();
  };

  updateCity();
  updatePlaceholder();
  updateWeather();

  city.addEventListener('change', updateWeather);
};
