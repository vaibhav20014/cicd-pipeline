const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// const db = mysql.createConnection({
//     host: 'sql_server_container', // Use the Docker container name for MySQL
//     port: '1433', 
//     user: 'SA',
//     password: 'Admin@123',
//     database: 'Testdb',
// });
 
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
