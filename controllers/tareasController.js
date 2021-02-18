const Tareas = require("../model/Tareas");
const Proyecto = require("../model/Proyecto");
const agregarTarea = async (req, res, next) => {
  const tareas = req.body.tarea;
  const { url } = req.params;

  const proyecto = await Proyecto.findOne({ where: { url: url } });
  const estado = 0;
  const proyectoId = proyecto.id;

  const tareaObj = Tareas.create({ tareas, estado, proyectoId });

  if (!tareaObj) {
    return next();
  }
  res.redirect(`/proyectos/${url}`);
};

const cambiarEstadoTarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({ where: { id: id } });
  let estado = 0;
  if (tarea.estado == estado) {
    estado = 1;
  }
  tarea.estado = estado;
  const resul = await tarea.save();
  if (!resul) {
    return next();
  }

  res.status(200).send("actualizado");
};

const eliminarTarea = async (req, res, next) => {
  const { id } = req.params;
  const taraea = await Tareas.destroy({ where: { id: id } });
  if (!taraea) {
    return next();
  }
  res.status(200).send("Eliminado Correctamente");
};

module.exports = {
  agregarTarea,
  cambiarEstadoTarea,
  eliminarTarea,
};
