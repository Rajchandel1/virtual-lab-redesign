const themeToggle = document.getElementById('theme-toggle');
const body = document.body;


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.className = savedTheme;
}


document.documentElement.style.setProperty('--transition-speed', '0.3s');

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
  }
});

themeToggle.addEventListener('click', () => {
  themeToggle.style.transform = 'rotate(180deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0)';
  }, 300);
});