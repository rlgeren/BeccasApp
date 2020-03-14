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
    await client.connect();
    const res = await client.query('SELECT * FROM teachers');
    console.log(res.rows[0].first_name); // Hello world!
    await client.end();
};

module.exports = {output, connector};