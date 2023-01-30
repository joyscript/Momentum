import { setUserSettings } from './modules/settings.js';
import { showTimeAndGreeting } from './modules/timer.js';
import { showBackground } from './modules/slider.js';
import { showWeather } from './modules/weather.js';
import { showQuote } from './modules/quote.js';
import { showPlayer } from './modules/player.js';
import { showMantra } from './modules/mantra.js';

setUserSettings();
showTimeAndGreeting();
showBackground();
showWeather();
showQuote();
showPlayer();
showMantra();
