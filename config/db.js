const { Sequelize } = require("sequelize");
// IMPORTANTO LAS VARIABLES
require("dotenv").config({ path: "variables.env" });

// const db = new Sequelize("uptask", "root", "1234", {
const db = new Sequelize(process.env.BD_NOMBRE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  define: {
    timestamps: false,
  },

  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
  },
});

module.exports = db;
