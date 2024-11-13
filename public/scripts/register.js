document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('form');
    const fechaNacimientoInput = document.getElementById('fecha_nacimiento');
    const edadInput = document.getElementById('edad');

    fechaNacimientoInput.addEventListener('change', function() {
        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        edadInput.value = edad;
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        // Validaciones con expresiones regulares
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const passwordPattern = /^[a-zA-Z0-9]{6,}$/; // Mínimo 6 caracteres

        if (!emailPattern.test(data.correo)) {
            alert('Correo electrónico no válido');
            return;
        }
        if (!passwordPattern.test(data.contraseña)) {
            alert('Contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Guardar usuario en localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro exitoso');
        window.location.href = '/public/views/home.html';
    });
});
