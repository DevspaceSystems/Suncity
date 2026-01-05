const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:8c%21cFP7Drp%246XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres'
});

client.connect()
    .then(() => {
        console.log('✅ Connected successfully!');
        return client.query('SELECT version()');
    })
    .then((res) => {
        console.log('PostgreSQL version:', res.rows[0].version);
        return client.end();
    })
    .catch((err) => {
        console.error('❌ Connection error:', err.message);
        process.exit(1);
    });
