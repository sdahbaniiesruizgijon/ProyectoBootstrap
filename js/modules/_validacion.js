export const initFormValidation = () => {
    const form = document.getElementById('formCita');
    if (!form) return;

    const reglas = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };

    form.addEventListener('submit', (event) => {
        let esValido = true;
        let errores = []; // Para acumular los mensajes de error

        //  Validar Nombre
        const nombre = document.getElementById('nombre');
        if (!reglas.nombre.test(nombre.value)) {
            nombre.classList.add('is-invalid');
            nombre.classList.remove('is-valid');
            esValido = false;
            errores.push("El nombre no es válido (mínimo 3 letras).");
        } else {
            nombre.classList.remove('is-invalid');
            nombre.classList.add('is-valid');
        }

        //  Validar Email
        const email = document.getElementById('email');
        if (email && !reglas.email.test(email.value)) {
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
            esValido = false;
            errores.push("El formato del email es incorrecto.");
        } else if (email) {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }

        //  Validar Fecha
        const fecha = document.getElementById('fecha');
        if (fecha && fecha.value) {
            const fechaSeleccionada = new Date(fecha.value);
            fechaSeleccionada.setHours(0,0,0,0);
            
            const hoy = new Date();
            hoy.setHours(0,0,0,0);

            if (fechaSeleccionada > hoy) {
                fecha.classList.add('is-invalid');
                fecha.classList.remove('is-valid');
                esValido = false;
                errores.push("La fecha no puede ser posterior a hoy.");
            } else {
                fecha.classList.remove('is-invalid');
                fecha.classList.add('is-valid');
            }
        }

        
        if (!esValido) {
            event.preventDefault();
            event.stopPropagation();
            
            // Aquí lanzamos el alert para que veas que sí funciona
            alert("⚠️ Por favor, corrige los siguientes errores:\n\n- " + errores.join("\n- "));
        } else {

    event.preventDefault(); 
    window.location.href = 'gracias.html'; 
}

        form.classList.add('was-validated');
    });
};