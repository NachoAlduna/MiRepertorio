// Importamos la librería de PostgreSQL
const { Pool } = require("pg");

// Configuración de la base de datos
const config = {
  host: "localhost",
  port: 5432,
  database: "repertorio",
  user: "nacho",
  password: "1524**",
};

// Instanciamos la clase Pool
const pool = new Pool(config);

module.exports = pool;
