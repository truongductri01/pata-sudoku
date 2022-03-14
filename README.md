# Pata Sudoku

## How to the run the code locally

- Run postgres and create database
- Create a env.json file for database connection
- Install dependency for both frontend and backend
- Run backend
- Send POST Request to create tables
- Run frontend
- Create new room locally
- Start at http://localhost:3000/register

**1. Create Database**

After successfully login to postgresql on your terminal, create the database name patasql

CREATE DATABASE patasql;

**2. env.json file**

In the root folder, create an env.json file (same level with both src, server and public) with the following details:

```json
{
  "user": "postgres",
  "host": "localhost",
  "database": "patasql",
  "password": "PASSWORD GO HERE",
  "port": 5432
}
```

**3. Install dependency for backend**

Go inside the server folder: `cd server`

Then install dependencies: `npm install`

And start the server: `npm start`

**4. Send POST Request to insert table automatically**

When the server is up and connected successfully to the database on your local machine, send a POST request to the server to insert needed tables:

`POST http://localhost:/8080/api/v1/testdata`

The response should have a 200 status and "Success" message

**5. Install dependencies and run the front end**

On another terminal, at the root folder, run: `npm install`

Then: `npm start`

**Note** When the app is compiled successfully and run, go to `http://localhost:3000/register` to register new users and start using the app like in the demo video

**6. Create Room locally**

In postgres command, run:

`INSERT INTO room (capacity, gameid, ishidden, canwitness, userids) VALUES (2, 1, 'no', 'no', '{}');`

Then: `SELECT * FROM room;` to view the id of the new room created

Use that id to input on the main page to join the room after loggin in

## More Note on using app

- Make sure the room is not full (check in database, make sure userids length is smaller than capacity)
- Game start right away when the room is full
