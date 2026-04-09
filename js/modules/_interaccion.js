/**
 * _interaccion.js
 * Manejo de feedback dinámico y efectos visuales
 */

// 1. Contador de caracteres para el formulario
export const initCharacterCount = () => {
    const textarea = document.getElementById('mensaje');
    const label = document.querySelector('label[for="mensaje"]');
    const MAX_CHARS = 200;

    if (textarea && label) {
        // Añadimos el límite real al HTML
        textarea.setAttribute('maxlength', MAX_CHARS);

        const counter = document.createElement('span');
        counter.className = 'badge bg-soft text-primary ms-2 small border';
        counter.innerText = `0 / ${MAX_CHARS}`;
        label.appendChild(counter);

        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            counter.innerText = `${length} / ${MAX_CHARS}`;
            
            if (length >= MAX_CHARS) {
                counter.classList.replace('text-primary', 'text-danger');
                counter.classList.add('border-danger');
            } else {
                counter.classList.replace('text-danger', 'text-primary');
                counter.classList.remove('border-danger');
            }
        });
    }
};

// 2. Animación de revelado al hacer scroll
export const initScrollReveal = () => {
    const elements = document.querySelectorAll('.card, .section-padding');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.15 // Se activa cuando se ve el 15% del elemento
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
};

// 3. Botón de volver arriba (Back to Top)
export const initBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Volver arriba');
    // Usamos clases de Bootstrap para el estilo
    btn.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 shadow-lg d-none';
    btn.style.zIndex = '1050';
    btn.style.borderRadius = '50%';
    btn.style.width = '45px';
    btn.style.height = '45px';
    
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.remove('d-none');
        } else {
            btn.classList.add('d-none');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// 4. Filtro de categorías del Blog mejorado
export const initBlogFilter = () => {
    const filters = document.querySelectorAll('[data-filter]'); // Buscamos por atributo
    const articles = document.querySelectorAll('article');

    if (filters.length === 0) return;

    filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = filter.getAttribute('data-filter').toLowerCase();
            
            articles.forEach(article => {
                // Buscamos el texto dentro del badge del artículo
                const badgeText = article.querySelector('.badge').innerText.toLowerCase();
                
                if (categoria === 'todos' || badgeText.includes(categoria)) {
                    article.classList.remove('d-none');
                    article.style.animation = 'fadeIn 0.5s ease';
                } else {
                    article.classList.add('d-none');
                }
            });

            // Feedback visual en el menú de categorías
            filters.forEach(f => f.classList.remove('active', 'fw-bold'));
            filter.classList.add('active', 'fw-bold');
        });
    });
};