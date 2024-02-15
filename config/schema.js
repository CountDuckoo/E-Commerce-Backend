require('dotenv').config();
const mysql = require('mysql2/promise');
const setUp = async () =>{
    const connection = await mysql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PW,
    });
    await connection.query('DROP DATABASE IF EXISTS ecommerce_db;');
    await connection.query('CREATE DATABASE ecommerce_db;');
    console.log("Database set up.");
    connection.end();
}

setUp();
