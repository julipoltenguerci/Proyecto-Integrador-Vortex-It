//Importación de modulo para conexión con BD MySQL de forma asíncrona usando promesas
//y módulo para carga de variables de entorno desde .env

const db = require("mysql2-promise")();
const dotEnv = require("dotenv");

dotEnv.config();

// Configuración para conexión a BD MySQL con variables de entorno
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
};

db.configure(config);

module.exports = db;
