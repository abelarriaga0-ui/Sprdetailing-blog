function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function renderSiteHeader() {
  const container = document.getElementById('site-header');
  if (!container) return;

  const current = getCurrentPage();

  const navLinks = [
    { label: 'Inicio', url: 'index.html' },
    { label: 'Biblioteca', url: 'index.html#guias-tecnicas' },
    { label: 'Contacto', url: 'contacto.html' }
  ];

  const navHTML = navLinks.map(link => {
    const isHomeActive = current === 'index.html' && link.url === 'index.html';
    const isContactActive = current === 'contacto.html' && link.url === 'contacto.html';
    const activeClass = isHomeActive || isContactActive ? 'active' : '';

    return `<a href="${link.url}" class="${activeClass}">${link.label}</a>`;
  }).join('');

  container.innerHTML = `
    <header class="site-header">
      <div class="topbar">
        <a href="index.html" class="brand">
          <span class="brand-title">Detailing Pro</span>
          <span class="brand-subtitle">Enciclopedia técnica de detailing e ingeniería automotriz</span>
        </a>

        <nav class="main-nav">
          ${navHTML}

          <div class="nav-dropdown" id="categoryDropdown">
            <button class="nav-dropdown-btn" type="button" aria-expanded="false">
              Categorías ▾
            </button>

            <div class="nav-dropdown-menu">
              <a href="index.html#categoria-mecanica">Mecánica</a>
              <a href="index.html#categoria-detailing">Detailing</a>
              <a href="index.html#categoria-exterior">Exterior</a>
              <a href="index.html#categoria-seguridad">Seguridad</a>
            </div>
          </div>
        </nav>

        <a href="index.html#guias-tecnicas" class="header-cta">Explorar guías</a>
      </div>
    </header>
  `;

  activateCategoryDropdown();
}

function activateCategoryDropdown() {
  const dropdown = document.getElementById('categoryDropdown');
  if (!dropdown) return;

  const button = dropdown.querySelector('.nav-dropdown-btn');

  button.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpen = dropdown.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  });

  dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

function renderSiteFooter() {
  const container = document.getElementById('site-footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <h3>Detailing Pro</h3>
          <p>
            Plataforma editorial enfocada en detailing avanzado, mantenimiento automotriz
            y fundamentos de ingeniería aplicados a la estética y mecánica del vehículo.
          </p>
        </div>

        <div class="footer-links">
          <h4>Secciones</h4>
          <a href="index.html">Inicio</a>
          <a href="index.html#guias-tecnicas">Biblioteca técnica</a>
          <a href="mantenimiento-inyectores.html">Inyectores</a>
          <a href="limpieza-tapiceria.html">Tapicería</a>
          <a href="faros.html">Faros</a>
          <a href="pulido-pintura.html">Pulido</a>
          <a href="suspension.html">Suspensión</a>
        </div>

        <div class="footer-links">
          <h4>Legal</h4>
          <a href="politica-privacidad.html">Política de privacidad</a>
          <a href="terminos-condiciones.html">Términos y condiciones</a>
          <a href="aviso-legal.html">Aviso legal</a>
          <a href="contacto.html">Contacto</a>
        </div>
      </div>

      <div class="footer-bottom">
        <strong>Manual de Ingeniería en Detailing Pro</strong><br>
        &copy; 2026 Todos los derechos reservados.
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSiteHeader();
  renderSiteFooter();
});
