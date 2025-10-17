function mostrarPagina(pagina) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  const secao = document.getElementById(pagina);
  if (secao) secao.classList.add('active');

  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
}
