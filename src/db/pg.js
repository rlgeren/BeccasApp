function output() {
    console.log("test");
};

async function connector() {
    const { Client } = require('pg');
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'analysis',
        password: 'Es7ofvaha!',
        port: 5432,
    });
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM teachers');
        console.log(res.rows[0].first_name);
        await client.end();
    } catch (error) {
        console.log("Unable to establish connection to database");
    }
};

module.exports = {output, connector};