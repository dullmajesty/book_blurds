const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 4000; // Change this to your desired port number

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// In-memory data store (for demonstration)
let users = [];

// User Registration Endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create new user
    const newUser = { username, email, password };
    users.push(newUser);

    return res.status(201).json({ message: 'User registered successfully' });
});

// User Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Save user in session
    req.session.user = user;

    return res.status(200).json({ message: 'Login successful' });
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

// Dashboard Endpoint (redirects to the main page)
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
