const src = require("./src");

async function start() {
    console.log(await src.db.pg.connector());
}

start();