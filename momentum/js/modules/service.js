export const fetchAndGo = async (url, func, errorFunc) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    func(data);
  } catch (err) {
    console.log(err);

    if (errorFunc) errorFunc(err);
  }
};

export const checkValue = (str) => str.trim().replace(/\s{1,}/g, ' ');

export const updateBar = (bar) => (bar.style.backgroundSize = `${(bar.value / bar.max) * 100}% 100%`);
