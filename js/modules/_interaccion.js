/**
 * _interaccion.js
 * Versión Corregida: Sincronización de Filtros + Paginación
 */

// 1. Contador de caracteres (Formulario)
export const initCharacterCount = () => {
    const textarea = document.getElementById('mensaje');
    const label = document.querySelector('label[for="mensaje"]');
    const MAX_CHARS = 200;

    if (textarea && label) {
        textarea.setAttribute('maxlength', MAX_CHARS);
        const counter = document.createElement('span');
        counter.className = 'badge bg-soft text-primary ms-2 small border';
        counter.innerText = `0 / ${MAX_CHARS}`;
        label.appendChild(counter);

        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            counter.innerText = `${length} / ${MAX_CHARS}`;
            
            const isLimit = length >= MAX_CHARS;
            counter.classList.toggle('text-danger', isLimit);
            counter.classList.toggle('border-danger', isLimit);
            counter.classList.toggle('text-primary', !isLimit);
        });
    }
};

export const initBlogLogic = () => {
    const searchInput = document.getElementById('blog-search');
    const articles = Array.from(document.querySelectorAll('.blog-item'));
    const pageButtons = document.querySelectorAll('.page-num');

    if (articles.length === 0) return;

    const itemsPerPage = 2;

    const showPage = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        articles.forEach((art, index) => {
            art.classList.add('d-none');
            if (index >= start && index < end) {
                art.classList.remove('d-none');
            }
        });

        // Marcar botón activo
        pageButtons.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.page) === page);
        });
    };

    // Click en los números
    pageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = parseInt(btn.dataset.page);
            showPage(targetPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Buscador
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            if (term === "") {
                showPage(1); // Si borra, vuelve al paginado
                document.querySelector('.pagination').classList.remove('d-none');
            } else {
                // Si escribe, mostramos todo lo que coincida y ocultamos paginación
                document.querySelector('.pagination').classList.add('d-none');
                articles.forEach(art => {
                    const text = art.innerText.toLowerCase();
                    art.classList.toggle('d-none', !text.includes(term));
                });
            }
        });
    }

    // Empezar en página 1
    showPage(1);
};

// 3. ScrollReveal y BackToTop (Igual que los tenías, están perfectos)
export const initScrollReveal = () => {
    const elements = document.querySelectorAll('.card, .section-padding');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
};

export const initBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 shadow-lg d-none';
    btn.style.zIndex = '1050';
    btn.style.borderRadius = '50%';
    btn.style.width = '45px';
    btn.style.height = '45px';
    
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.classList.toggle('d-none', window.scrollY <= 500);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};