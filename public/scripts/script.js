document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validaciones con expresiones regulares
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const passwordPattern = /^[a-zA-Z0-9]{6,}$/; // Mínimo 6 caracteres

        if (!emailPattern.test(email)) {
            alert('Correo electrónico no válido');
            return;
        }
        if (!passwordPattern.test(password)) {
            alert('Contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Verificación de credenciales
        if (email === 'axel@example.com' && password === '123456') {
            window.location.href = '/public/views/home.html';
        } else {
            alert('Error al iniciar sesión: Correo o contraseña incorrectos');
        }
    });
});

