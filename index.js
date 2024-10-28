const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql.railway.internal',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'railway',
  password: process.env.DB_PASSWORD || 'UznfDFyMCawGpTpOpnRNNOWqumBHWtiJ',
  port: process.env.DB_PORT || 3306,
}).promise();

// Test API endpoint
app.get('/api', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW()');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
