// server/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SocialSecurity',
    password: 'p4l', // from pgAdmin
    port: 5432,
});

module.exports = pool;
