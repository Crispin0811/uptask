const { Sequelize } = require("../config/db");
const db = require("../config/db");
const Proyecto = require("./Proyecto");

const Tareas = db.define(
  "tareas",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tareas: Sequelize.STRING(100),
    estado: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  },
  {
    tableName: "tareas",
  }
);

//un proyecto tiene muchas tareas (relacion de uno a muchos)
Tareas.belongsTo(Proyecto);

module.exports = Tareas;
