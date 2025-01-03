const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the CORS middleware

const app = express();
app.use(express.json());
 
// Add CORS middleware
const corsOptions = {
    origin: '*', // Allow requests from all origins
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
app.use(cors(corsOptions)); // Use the CORS middleware

// Database connection
const db = mysql.createConnection({
    host: 'sql-server-service',
    port: '3306',
    user: 'sa',
    password: 'Admin@123',
    database: 'Testdb',
});
 
// Register Endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (email, password_hash) VALUES (?, ?)',
        [email, passwordHash],
        (err, result) => {
            if (err) {
                console.error("Error inserting data:", err); // Log the error
                return res.status(500).send('Error saving user to database');
            }
            console.log("User successfully registered:", result);
            res.status(201).send('User registered');
        }
    );
});


// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Query the database to find the user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error("Error querying the database:", err); // Log database errors
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(401).send('User not found');
        }

        const user = results[0];

        // Check if password matches the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token with a short expiration time (e.g., 1 hour)
        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });

        // Send response with the token
        res.status(200).json({ token });
    });
});


// Start server
app.listen(3000,'0.0.0.0', () => console.log('Server running on port 3000'));
