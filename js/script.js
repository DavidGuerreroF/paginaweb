// Animaciones al hacer scroll para otras secciones
const animatedElements = document.querySelectorAll('.fade-up, .fade-in');

// Eliminamos del hero para que cargue instantáneo
const filteredElements = Array.from(animatedElements).filter(el => !el.closest('.hero'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

filteredElements.forEach(el => observer.observe(el));
