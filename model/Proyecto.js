const { Sequelize } = require("sequelize");

const db = require("../config/db");
const slug = require("slug");
const shortid =require('shortid')

const Proyecto = db.define(
  "proyectos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(100),
    },
    url: {
      type: Sequelize.STRING(100),
    },
  },
  {
    tableName: "proyectos",
    hooks:{
      //lo que le pasamos como parametro a before es un arreglo donde esta los datos
      beforeCreate(proyecto){
        const url = slug(proyecto.nombre);
        proyecto.url = url +'-'+ shortid.generate();
      }
    }
  }
);

module.exports = Proyecto;
