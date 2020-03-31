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

        const {bookTitle, firstName, lastName, pages} = await getInput();

        const query = 'INSERT INTO true_crime_books(title, author_first_name, author_last_name, page_count) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [bookTitle, firstName, lastName, pages];

        const res = await client.query(query, values);
        console.log(res.rows[0]);
    } catch (error) {
        console.log(`connector: ${error}`);
    } finally {
        await client.end();
    }
};

async function getInput() {
    try {
        const readline = require("readline");
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        //setup the questions
        const questions = new Promise((resolve, reject) => {
            rl.question("What is the title of the book? ", function(bookTitle) {
                rl.question("What is the author's first name? ", function(firstName) {
                    rl.question("What is the author's last name? ", function(lastName) {
                        rl.question("How many pages does the book have? ", function(pages) {
                            resolve({bookTitle, firstName, lastName, pages});
                        });
                    });
                });
            });
        });

        const {bookTitle, firstName, lastName, pages} = await questions;
        // close stdin when done
        rl.close()

        // return the values
        return {bookTitle, firstName, lastName, pages};
    } catch (error) {
        console.log(`getInput: ${error}`);
    } finally {
        rl.close();
    }
}

module.exports = {output, connector};