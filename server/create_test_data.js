// BEFORE THE FIRST TEST RUN, RECREATE A DATABASE CALLED patasql
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
//     pool.query(`DROP DATABASE patasql`);
//     return pool.query(`CREATE DATABASE patasql`);
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
// TBD: change the relations and relate this to the game and room tables
async function createUserTable(){
    return pool.query(`CREATE TABLE userInfo (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        gamesId text[] NOT NULL,
        salt varchar(255) NOT NULL,
        username varchar(255) NOT NULL,
        hash varchar(255) NOT NULL
    )`);
}

// TBD: change the relations and relate this to the user and room tables
async function createGameTable(){
    return pool.query(`CREATE TABLE game (
        startTime TIMESTAMP NOT NULL,
        endTime TIMESTAMP NOT NULL,
        boardId varchar(255) NOT NULL,
        playersIds text[] NOT NULL,
        winnerId varchar(255),
        id SERIAL PRIMARY KEY
    )`);
}

// TBD: change the relations and relate this to the user, game and room tables
async function createBoardTable(){
    // difficulty can only be easy, medium, hard
    return pool.query(`CREATE TABLE board (
        id SERIAL PRIMARY KEY,
        board int[][] NOT NULL,
        difficulty varchar(255) NOT NULL
    )`);
}

async function addBoardQuery(board, difficulty){ 
    return pool.query(`INSERT INTO board (board, difficulty) VALUES ($1, $2) RETURNING id`, [board, difficulty]);
}

async function addGameQuery(startTime, endTime, boardId, playersIds, winnerId){
    return pool.query(`INSERT INTO game (startTime, endTime, boardId, playersIds, winnerId)
    VALUES ($1, $2, $3, $4, $5)`,
    [startTime, endTime, boardId, playersIds, winnerId]);
}

async function addUserQuery(name, email, gamesId, salt, username, hash){
    return pool.query(`INSERT INTO userInfo (name, email, gamesId, salt, username, hash) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, email, gamesId, salt, username, hash]);
}

async function addRoomQuery(capacity, gameId, isHidden, canWitness, userIds){
    return pool.query(`INSERT INTO room (capacity, gameId, isHidden, canWitness, userIds)
    VALUES ($1, $2, $3, $4, $5)`,
    [capacity, gameId, isHidden, canWitness, userIds]);
}

// Users function
async function hasUserWithUsername(username) { 
    return pool.query(`SELECT * from userinfo WHERE username=$1`, [username]);
}

// Game function
async function getGameWithId(gameId) { 
    return pool.query(`SELECT * from game WHERE id=$1`, [gameId]);
} 

const testDataFunctions =  {
    createRoomTable, 
    addRoomQuery, connect, 
    addUserQuery, createUserTable, 
    createGameTable, createBoardTable, 
    addBoardQuery, addGameQuery, hasUserWithUsername, getGameWithId};

module.exports = testDataFunctions;