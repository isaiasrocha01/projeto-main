document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const carrossel = document.querySelector('.projetos-carrossel');
  const projetos = document.querySelectorAll('.projetos-carrossel .projeto');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let index = 0;

  function showProjeto(idx) {
    projetos.forEach((projeto, i) => {
      projeto.style.transform = `translateX(${100 * (i - idx)}%)`;
    });
  }

  showProjeto(index);

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % projetos.length;
    showProjeto(index);
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + projetos.length) % projetos.length;
    showProjeto(index);
  });

  // Swipe no mobile
  let startX = 0;
  carrossel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  carrossel.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) prevBtn.click();
    if (startX - endX > 50) nextBtn.click();
  });
});
