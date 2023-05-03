const { error } = require('console');
require('dotenv').config();

const { Pool } = require('pg');
const options = require('../queries')
// const pool = new Pool({
//     "user": options.user,
//     "host": options.host,
//     "database": options.database,
//     "password": options.password,
//     "port": options.port,
//     "connectionTimeoutMillis": 0,
// })

const pool = new Pool({
    connectionString: process.env.DB_URL + '?ssl=true'
});

console.log(process.env.DB_URL+ '?ssl=true');
pool.query(`SELECT 1`);

exports.getDiffArmors = async () => {
    try{
        const data = await pool.query(`
        (SELECT * FROM armors WHERE category='Helm' ORDER BY RANDOM() LIMIT 1)
        UNION ALL
        (SELECT * FROM armors WHERE category='Chest Armor' ORDER BY RANDOM() LIMIT 1)
        UNION ALL
        (SELECT * FROM armors WHERE category='Gauntlets' ORDER BY RANDOM() LIMIT 1)
        UNION ALL
        (SELECT * FROM armors WHERE category='Leg Armor' ORDER BY RANDOM() LIMIT 1)
        `)
        //console.log(data.rows);
        return data.rows;
    }
    catch (err) {
        throw err;
    }
}

//TODO: make sure powerstance cant return ranged weapons
exports.getWepsSameTyped = async (query) => {
    console.log(`
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
    `);
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
        //console.log(data.rows)
        return data.rows;
    }
    catch (err) {
        throw err;
    }
}

exports.getItemsDiffTable = async (table1, table2) => {
    console.log(`
    (SELECT * FROM "${table1}" ORDER BY RANDOM() LIMIT 1)
    UNION ALL
    (SELECT * FROM "${table2}" ORDER BY RANDOM() LIMIT 1)
    `);
    try {
        const data = await pool.query(`
        (SELECT * FROM "${table1}" ORDER BY RANDOM() LIMIT 1)
        UNION ALL
        (SELECT * FROM "${table2}" ORDER BY RANDOM() LIMIT 1)
        `)
        //console.log(data.rows)
        return data.rows;
    }
    catch (err) {
        throw err;
    }
}

//Get x of random item
exports.getItem = async (table, limit = 1) => {
    console.log(`SELECT * FROM "${table}" ORDER BY RANDOM() LIMIT ${limit}`)
    try {
        const data = await pool.query(`SELECT * FROM "${table}" ORDER BY RANDOM() LIMIT ${limit}`)
        //console.log(data.rows)
        return (data.rows.length === 1) ? data.rows[0] : data.rows
    }
    catch (err) {
        throw err;
    }
}

//Get item conditionally based on type
exports.getWhere = async (table, query, limit = 1) => {
    console.log(`SELECT * FROM "${table}" WHERE ${query} ORDER BY RANDOM() LIMIT ${limit}`);
    try {
        const data = await pool.query(`SELECT * FROM "${table}" WHERE ${query} ORDER BY RANDOM() LIMIT ${limit}`)
        //console.log(data.rows)
        return data.rows;
    }
    catch (err) {
        throw err;
    }
}


