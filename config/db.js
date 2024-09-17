// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Crear la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME

  /*host: '127.0.0.1',
  user: 'root',
  password: '123123',
  database: 'VeterinariaDB'*/
});

module.exports = pool.promise();
