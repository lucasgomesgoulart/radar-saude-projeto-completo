const { Pool } = require('pg');

module.exports = async function connect() {
    if (global.connection)
        return global.connection.connect();

    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL
    });

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}