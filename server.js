const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());


// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // Use the DB_HOST environment variable
  port: process.env.DB_PORT,        // Ensure DB_PORT is 3306
  user: process.env.DB_USER,      // Use the DB_USER environment variable
  password: process.env.DB_PASSWORD,  // Use the DB_PASSWORD environment variable
  database: process.env.DB_NAME   // Use the DB_NAME environment variable
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});
 
// Register Endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', 
        [username, email, passwordHash], 
        (err) => {
            if (err) return res.status(500).send(err.message);
            res.status(201).send('User registered'); 
        }
    );
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (results.length === 0) return res.status(401).send('User not found');
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).send('Invalid credentials');
        const token = jwt.sign({ id: user.id }, 'secretKey');
        res.status(200).json({ token });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
