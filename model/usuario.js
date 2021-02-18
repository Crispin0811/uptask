const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyectos = require("../model/Proyecto");

const Usuarios = db.define(
  "Usuario",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Agrega un correo valido",
        },
        notEmpty: {
          msg: "El Email no puede ir vacio",
        },
      },
      unique: { args: true, msg: "Usuario Registrado" },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El Password no puede ir vacio",
        },
      },
    },

    token: {
      type: Sequelize.STRING,
    },
    experiracion: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: "Usuarios",
  }
);
Usuarios.hasMany(Proyectos);
module.exports = Usuarios;
