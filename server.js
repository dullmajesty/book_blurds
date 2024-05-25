// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 11000; // Change this to your desired port number

app.use(express.static('public')); // This line should come after initializing 'app'



// Middleware
app.use(bodyParser.json());

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

    return res.status(200).json({ message: 'Login successful' });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
