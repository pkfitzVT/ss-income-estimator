// server/server.js
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors()); // Allow cross-origin from React dev server
app.use(express.json());

app.get('/api/wages/top35', async (req, res) => {
    try {
        const { userId = 1 } = req.query;
        const result = await pool.query(
            `SELECT year, reported_earnings, ss_taxable_earnings
       FROM wages
       WHERE user_id = $1
       ORDER BY ss_taxable_earnings DESC
       LIMIT 35`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('DB error:', err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
