// faq-engine.js - Solo inyecta las tarjetas (Sin títulos adicionales)
async function renderUniversalFAQ() {
    const container = document.getElementById('faq-engine-container');
    if (!container) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    try {
        const response = await fetch('blogs.json');
        const blogs = await response.json();
        
        // Empezamos directamente con el contenedor de rejilla
        let html = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 12px;">
        `;

        const otros = blogs.filter(b => b.url !== currentPath);

        otros.forEach(blog => {
            html += `
                <a href="${blog.url}" style="text-decoration: none; color: inherit; display: block;">
                    <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #eee; transition: 0.2s; display: flex; justify-content: space-between; align-items: center;"
                         onmouseover="this.style.borderColor='#e67e22'; this.style.background='#fcfcfc';" 
                         onmouseout="this.style.borderColor='#eee'; this.style.background='#ffffff';">
                        
                        <div style="flex: 1;">
                            <span style="display: block; font-weight: bold; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 3px;">
                                ${blog.titulo}
                            </span>
                            <span style="font-size: 0.8rem; color: #666; line-height: 1.3; display: block;">
                                ${blog.descripcion.substring(0, 80)}...
                            </span>
                        </div>
                        <span style="color: #e67e22; font-size: 1.1rem; margin-left: 10px; font-weight: bold;">→</span>
                    </div>
                </a>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;

    } catch (error) {
        console.error("Error en el motor de FAQs:", error);
    }
}

document.addEventListener('DOMContentLoaded', renderUniversalFAQ);
