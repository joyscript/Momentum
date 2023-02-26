import './index.html';
import './style.scss';

import { showBackground } from './js/slider';
import { showTimeAndGreeting } from './js/timer';
import { showWeather } from './js/weather';
import { showQuote } from './js/quote';
import { showPlayer } from './js/player';
import { showMantra } from './js/mantra';
import { setSettings } from './js/settings';

showBackground();
showTimeAndGreeting();
showWeather();
showQuote();
showPlayer();
showMantra();
setSettings();

// --------------------------------------------

console.log(`Самооценка - 160 баллов. Все требования выполнены.
Дополнительный функционал: Todo, мантра, автослайдер, кастомизация цветовой темы.
Смена фона сделана слайдером, для кроссбраузерности. Ссылка на картинку появляется в консоли - для удобства проверки.
Иногда GitHub сильно тормозит и картинки загружаются долго - больше 1-3s. Если так происходит - зайдите попозже.
Если Unsplash не отвечает - значит, закончился лимит, нужно подождать начала следующего часа.
Приятной проверки и хорошего дня!`)
