// Animação do header ao fazer scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.topo');
  const logoDark = document.querySelector('.logo-dark');
  const logoLight = document.querySelector('.logo-light');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    logoDark.style.display = 'none';
    logoLight.style.display = 'block';
  } else {
    header.classList.remove('scrolled');
    logoDark.style.display = 'block';
    logoLight.style.display = 'none';
  }
});
