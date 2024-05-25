// script.js

function showSection(sectionId) {
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('signup').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Send login data to backend server using AJAX or fetch API
    // Example using fetch API:
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // Login successful, do something (e.g., redirect to dashboard)
        } else {
            // Login failed, show error message
            alert('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Perform validation (e.g., password matching)

    // Send signup data to backend server using AJAX or fetch API
    // Example using fetch API:
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        if (response.ok) {
            // Signup successful, do something (e.g., redirect to dashboard)
        } else {
            // Signup failed, show error message
            alert('Signup failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
