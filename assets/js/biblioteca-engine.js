function normalizeText(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getSelectedCategory() {
  const params = new URLSearchParams(window.location.search);
  return params.get('categoria') || 'todas';
}

async function renderBiblioteca() {
  const grid = document.getElementById('library-grid');
  const title = document.getElementById('library-title');
  const filterBar = document.getElementById('category-filter-bar');

  if (!grid || !title || !filterBar) return;

  try {
    const response = await fetch('blogs.json');
    const blogs = await response.json();

    const selectedCategory = getSelectedCategory();
    const selectedNormalized = normalizeText(selectedCategory);

    const categories = [...new Set(blogs.map(blog => blog.categoria).filter(Boolean))];

    const categoryButtons = [
      `<a href="biblioteca.html" class="category-pill ${selectedCategory === 'todas' ? 'active' : ''}">Todas</a>`,
      ...categories.map(category => {
        const isActive = normalizeText(category) === selectedNormalized;
        return `
          <a href="biblioteca.html?categoria=${encodeURIComponent(category)}" class="category-pill ${isActive ? 'active' : ''}">
            ${category}
          </a>
        `;
      })
    ].join('');

    filterBar.innerHTML = categoryButtons;

    const filteredBlogs = selectedCategory === 'todas'
      ? blogs
      : blogs.filter(blog => normalizeText(blog.categoria) === selectedNormalized);

    title.textContent = selectedCategory === 'todas'
      ? 'Todas las guías técnicas'
      : `Guías de ${selectedCategory}`;

    if (!filteredBlogs.length) {
      grid.innerHTML = `
        <div class="tech-note">
          <strong>Sin artículos disponibles:</strong> todavía no existen publicaciones en esta categoría.
        </div>
      `;
      return;
    }

    grid.innerHTML = filteredBlogs.map(blog => `
      <a href="${blog.url}" class="related-card">
        <div class="related-card-inner">
          <div>
            <span class="related-card-title">${blog.titulo}</span>
            <span class="related-card-description">
              ${blog.descripcion}
            </span>
            <span class="category-label">${blog.categoria}</span>
          </div>
          <span class="related-card-arrow">→</span>
        </div>
      </a>
    `).join('');

  } catch (error) {
    console.error('Error cargando biblioteca:', error);
    grid.innerHTML = `
      <div class="tech-note">
        <strong>Error:</strong> no se pudo cargar la biblioteca técnica.
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', renderBiblioteca);
