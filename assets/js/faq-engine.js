async function renderUniversalFAQ() {
  const container = document.getElementById('faq-engine-container');
  if (!container) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  try {
    const response = await fetch('blogs.json');
    const blogs = await response.json();

    const otros = blogs.filter(blog => blog.url !== currentPath);

    const html = `
      <div class="related-grid">
        ${otros.map(blog => `
          <a href="${blog.url}" class="related-card">
            <div class="related-card-inner">
              <div>
                <span class="related-card-title">${blog.titulo}</span>
                <span class="related-card-description">
                  ${blog.descripcion.substring(0, 95)}...
                </span>
              </div>
              <span class="related-card-arrow">→</span>
            </div>
          </a>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;
  } catch (error) {
    console.error('Error en el motor de navegación técnica:', error);
  }
}

document.addEventListener('DOMContentLoaded', renderUniversalFAQ);
