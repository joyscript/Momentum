export const fetchAndGo = async (url, func, errorFunc) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    func(data);
  } catch (err) {
    errorFunc();
  }
};
