const fetchAndGo = async (url, func, errorFunc) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    func(data);
  } catch (err) {
    if (errorFunc) errorFunc();
  }
};

const checkValue = (str) => str.trim().replace(/\s{1,}/g, ' ');

const updateBar = (bar) => (bar.style.backgroundSize = `${(bar.value / bar.max) * 100}% 100%`);

const shuffleArr = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { fetchAndGo, checkValue, updateBar, shuffleArr };
