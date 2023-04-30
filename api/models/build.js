const { error } = require('console');

const { Pool } = require('pg');
const options = require('../queries')
const pool = new Pool({
    "user": options.user,
    "host": options.host,
    "database": options.database,
    "password": options.password,
    "port": options.port,
    "connectionTimeoutMillis": 0,
})


exports.getWepsSameTyped = async (query) => {
    try {
        const data = await pool.query(`
        SELECT weapon1."name", weapon1.image, weapon1.aow, weapon1."type"
        FROM weapons weapon1
        JOIN (
            SELECT "type"
            FROM weapons
            ORDER BY RANDOM()
            LIMIT 1
        ) weapon2 ON ${query}
        ORDER BY RANDOM()
        LIMIT 2;
        `)
        console.log(data.rows)
        return data
    }
    catch (err) {
        throw err;
    }
}

//Get x of random item
exports.getItem = async (table, limit = 1) => {
    try {
        const data = await pool.query(`SELECT * FROM ${table} ORDER BY RANDOM() LIMIT ${limit}`)
        console.log(data.rows)
        return data.rows
    }
    catch (err) {
        throw err;
    }
}

//Get item conditionally based on type
exports.getWhere = async (table, query, limit = 1) => {
    try {
        const data = await pool.query(`SELECT * FROM ${table} WHERE ${query} ORDER BY RANDOM() LIMIT ${limit}`)
        console.log(data.rows)
        return data.rows
    }
    catch (err) {
        throw err;
    }
}


