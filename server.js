const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const app = express();
app.use(express.json());

// Set up the connection to SQL Server
const config = {
    user: 'sa',
    password: 'Admin@123',
    server: 'sql_server_container',  // Use the name of your SQL Server container
    database: 'Testdb',
    port: 1433,
    options: {
        encrypt: true,  // Use this for encryption, especially in cloud environments
        trustServerCertificate: true  // Avoid SSL issues for local dev
    }
};

// Register Endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    
    try {
        const pool = await sql.connect(config);  // Connect to SQL Server
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('password_hash', sql.VarChar, passwordHash)
            .query('INSERT INTO users (username, email, password_hash) VALUES (@username, @email, @password_hash)');
        
        res.status(201).send('User registered');
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).send(err.message);
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(config);  // Connect to SQL Server
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM users WHERE email = @email');
        
        if (result.recordset.length === 0) {
            return res.status(401).send('User not found');
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).send('Invalid credentials');
        
        const token = jwt.sign({ id: user.id }, 'secretKey');
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
