// create database in psql and run this script
const { response } = require("express");
const pg = require("pg");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

async function connect() {
    pool.connect().then(function () {
        console.log(`Connected to postgress`);
    });
}

// async function createDatabase(){
//     const databaseName = "patasql";
//     const datNames = await pool.query(`select datname from pg_database`).then(response => response.rows);
//     for (let el of datNames) {
//         console.log(el.datname);
//         if (el.datname === databaseName) {
//             console.log(`Database ${databaseName} already exists`);
//             await pool.query(`DROP database ${databaseName}`);
//             break;
//         }
//     }
//     await pool.query(`CREATE DATABASE ${databaseName}`);
//     return pool.query(`USE ${databaseName}`);
// }

async function createRoomTable(){
    return pool.query(`CREATE TABLE room (
        id SERIAL PRIMARY KEY,
        capacity INTEGER NOT NULL,
        gameId varchar(255) NOT NULL,
        isHidden BOOLEAN NOT NULL,
        canWitness BOOLEAN NOT NULL,
        userIds text[] NOT NULL
    )`);
}
async function addRoomQuery(capacity, gameId, isHidden, canWitness, userIds){
    return pool.query(`INSERT INTO room (capacity, gameId, isHidden, canWitness, userIds)
    VALUES ($1, $2, $3, $4, ARRAY[$5, $6])`,
    [capacity, gameId, isHidden, canWitness, userIds[0], userIds[1]]);
}

const testDataFunctions =  {createRoomTable, addRoomQuery, connect}

module.exports = testDataFunctions;