function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

async function getCategoriesFromBlogs() {
  try {
    const response = await fetch('blogs.json');
    const blogs = await response.json();

    return [...new Set(
      blogs
        .map(blog => blog.categoria)
        .filter(Boolean)
    )];
  } catch (error) {
    console.error('Error cargando categorías:', error);
    return ['Mecánica', 'Detailing', 'Exterior'];
  }
}

async function renderSiteHeader() {
  const container = document.getElementById('site-header');
  if (!container) return;

  const current = getCurrentPage();
  const categories = await getCategoriesFromBlogs();

  const navLinks = [
    { label: 'Inicio', url: 'index.html' },
    { label: 'Biblioteca', url: 'biblioteca.html' },
    { label: 'Contacto', url: 'contacto.html' }
  ];

  const navHTML = navLinks.map(link => {
    const activeClass = current === link.url ? 'active' : '';
    return `<a href="${link.url}" class="${activeClass}">${link.label}</a>`;
  }).join('');

  const categoryHTML = categories.map(category => `
    <a href="biblioteca.html?categoria=${encodeURIComponent(category)}">${category}</a>
  `).join('');

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
              <a href="biblioteca.html">Todas las guías</a>
              ${categoryHTML}
            </div>
          </div>
        </nav>

        <a href="biblioteca.html" class="header-cta">Explorar guías</a>
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
          <a href="biblioteca.html">Biblioteca técnica</a>
          <a href="biblioteca.html?categoria=Mecánica">Mecánica</a>
          <a href="biblioteca.html?categoria=Detailing">Detailing</a>
          <a href="biblioteca.html?categoria=Exterior">Exterior</a>
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
