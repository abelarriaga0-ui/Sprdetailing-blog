// faq-engine.js - El "Cerebro" de diseño de tus blogs
async function renderUniversalFAQ() {
    const container = document.getElementById('faq-engine-container');
    if (!container) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    try {
        const response = await fetch('blogs.json');
        const blogs = await response.json();
        
        // --- AQUÍ EDITAS EL DISEÑO PARA TODOS LOS BLOGS ---
        let html = `
            <div style="margin-top: 80px; border-top: 2px solid #eee; padding-top: 40px;">
                <h2 style="font-size: 1.8rem; color: #1a1a1a; margin-bottom: 10px; border:none; padding:0;">
                    Biblioteca de Guías Técnicas
                </h2>
                <p style="color: #666; margin-bottom: 30px;">Explora otros módulos de nuestra enciclopedia automotriz:</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
        `;

        const otros = blogs.filter(b => b.url !== currentPath);

        otros.forEach(blog => {
            html += `
                <a href="${blog.url}" style="text-decoration: none; color: inherit; display: block;">
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #eee; transition: 0.3s; display: flex; justify-content: space-between; align-items: center;"
                         onmouseover="this.style.borderColor='#e67e22'; this.style.transform='translateY(-3px)'; this.style.background='#fff'; this.style.boxShadow='0 5px 15px rgba(0,0,0,0.05)';" 
                         onmouseout="this.style.borderColor='#eee'; this.style.transform='translateY(0)'; this.style.background='#f9f9f9'; this.style.boxShadow='none';">
                        
                        <div style="flex: 1;">
                            <span style="display: block; font-weight: bold; font-size: 1rem; color: #1a1a1a; margin-bottom: 5px;">
                                ${blog.titulo}
                            </span>
                            <span style="font-size: 0.85rem; color: #666; line-height: 1.4; display: block;">
                                ${blog.descripcion}
                            </span>
                        </div>
                        <span style="color: #e67e22; font-size: 1.4rem; margin-left: 15px; font-weight: bold;">→</span>
                    </div>
                </a>
            `;
        });

        html += `</div></div>`;
        container.innerHTML = html;

    } catch (error) {
        console.error("Error cargando el motor de FAQs:", error);
    }
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', renderUniversalFAQ);
