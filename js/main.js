import { initNavbarScroll, initSmoothScroll } from './modules/_ui.js';
import { initFormValidation } from './modules/_validacion.js';
// Importamos initBlogLogic que es la que maneja el paginado de 2 en 2 y el buscador
import { initCharacterCount, initScrollReveal, initBackToTop, initBlogLogic } from './modules/_interaccion.js'; 

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    // 1. UI y Navegación
    initNavbarScroll();
    initSmoothScroll();
    
    // 2. Formulario
    initFormValidation();
    
    // 3. Interacciones Dinámicas
    initCharacterCount();
    initScrollReveal();
    initBackToTop();
    
    // 4. Lógica del Blog (Paginación y Buscador)
    // Usamos esta única función para que no se peleen entre ellas
    initBlogLogic(); 
});