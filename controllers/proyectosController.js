const Proyectos = require("../model/Proyecto");
const Tareas = require("../model/Tareas");

const proyectosHome = async (req, res) => {
  const UsuarioId = res.locals.usuario.id;

  const proyectos = await Proyectos.findAll({
    where: { UsuarioId: UsuarioId },
  });
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

const formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll({
    where: { UsuarioId: UsuarioId },
  });

  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
  });
};

const nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll({
    where: { UsuarioId: UsuarioId },
  });

  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ text: "Agrega el nombre del proyecto" });
  }

  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    //entre {} van los datos a guardar
    const UsuarioId = res.locals.usuario.id;
    Proyectos.create({ nombre, UsuarioId })
      .then(() => {
        res.redirect("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

const proyectoPorUrl = async (req, res) => {
  const { url } = req.params;
  const UsuarioId = res.locals.usuario.id;

  const proyectos = await Proyectos.findAll({
    where: { UsuarioId: UsuarioId },
  });

  const proyecto = await Proyectos.findOne({ where: { url: url } });
  const tareas = await Tareas.findAll({ where: { proyectoId: proyecto.id } });
  console.log(JSON.stringify(tareas));

  if (proyecto === null) {
    return res.render("index", {
      nombrePagina: "Proyectos",
    });
  } else {
    res.render("tareas", {
      nombrePagina: "Tareas del Proyecto",
      proyectos,
      proyecto,
      tareas,
    });
  }
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const UsuarioId = res.locals.usuario.id;

  const proyectosPromise = Proyectos.findAll({
    where: { UsuarioId: UsuarioId },
  });
  const proyectoPromise = Proyectos.findOne({ where: { id: id, UsuarioId } });

  //como las consultas no depende unas de otras es mejor hacer una desestructuracion
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};

const actualizarProycto = async (req, res) => {
  const proyectos = await Proyectos.findAll({
    where: { UsuarioId: UsuarioId },
  });

  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ text: "Agrega el nombre del proyecto" });
  }

  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    //entre {} van los datos a guardar
    Proyectos.update(
      { nombre: nombre },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/");
  }
};

const eliminarProyecto = async (req, res) => {
  const { url } = req.params;
  const proyecto = Proyectos.destroy({ where: { url: url } });
  res.send("proyecto eliminado correctamente");
};

module.exports = {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
  editarProyecto,
  actualizarProycto,
  eliminarProyecto,
};
