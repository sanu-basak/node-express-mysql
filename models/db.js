const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

const connection = mysql.createConnection({
    database : dbConfig.DB,
    host     : dbConfig.HOST,
    user     : dbConfig.USERNAME,
    password : dbConfig.PASSWORD
});

connection.connect( error => {
    if(error) throw error;
    console.log('Successfully connected to the database');
})

module.exports = connection;