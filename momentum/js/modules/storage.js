export const storage = () => {
  const name = document.querySelector('.name');
  
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('name', name.value);
  });

  window.addEventListener('load', () => {
    name.value = localStorage.getItem('name');
  });
};
