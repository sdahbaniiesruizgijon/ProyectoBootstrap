import { initNavbarScroll, initSmoothScroll } from './modules/_ui.js';
import { initFormValidation } from './modules/_validacion.js';
// Cambiamos la ruta a _interaccion.js que es donde viven estas funciones:
import { initCharacterCount, initScrollReveal, initBackToTop, initBlogFilter } from './modules/_interaccion.js'; 

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    // 1. UI y Navegación
    initNavbarScroll();
    initSmoothScroll();
    
    // 2. Formulario (Solo se ejecutará si existe el form en la página)
    initFormValidation();
    
    // 3. Interacciones Dinámicas
    initCharacterCount();
    initScrollReveal();
    initBackToTop();
    initBlogFilter(); // También la añadimos por si estás en la página de Recursos
});