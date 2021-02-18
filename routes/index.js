const express = require("express");
const app = express();
const { body } = require("express-validator");

const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuarioController = require("../controllers/usuarioController");
const loginController = require("../controllers/loginController");

app.get(
  "/",
  loginController.usuarioAutenticado,
  proyectosController.proyectosHome
);

app.get(
  "/nuevo-proyecto",
  loginController.usuarioAutenticado,
  proyectosController.formularioProyecto
);
app.post(
  "/nuevo-proyecto",
  loginController.usuarioAutenticado,
  //nombre es como se llama el input
  [body("nombre").not().isEmpty().trim().escape()],
  proyectosController.nuevoProyecto
);

//Listar Proyectos
app.get(
  "/proyectos/:url",
  loginController.usuarioAutenticado,
  proyectosController.proyectoPorUrl
);

//Editar Proyectos
app.get(
  "/proyectos/editar/:id",
  loginController.usuarioAutenticado,
  proyectosController.editarProyecto
);
app.post(
  "/nuevo-proyecto/:id",
  loginController.usuarioAutenticado,
  proyectosController.actualizarProycto
);

//Eliminar Proyecto
app.delete(
  "/proyecto/:url",
  loginController.usuarioAutenticado,
  proyectosController.eliminarProyecto
);

//agregar Tareas
app.post(
  "/proyectos/:url",
  loginController.usuarioAutenticado,
  tareasController.agregarTarea
);

//actualizar estado(patch solo actualiza una porcion de la inf)
app.patch(
  "/tareas/:id",
  loginController.usuarioAutenticado,
  tareasController.cambiarEstadoTarea
);

//eliminar tarea
app.delete(
  "/tareas/:id",
  loginController.usuarioAutenticado,
  tareasController.eliminarTarea
);

// CREAR NUEVA CUENTA
app.get("/crear-cuenta", usuarioController.formCrearCuenta);
app.post("/crear-cuenta", usuarioController.crearCuenta);

app.get("/iniciar-sesion", usuarioController.formIniciarSesion);
app.post("/iniciar-sesion", loginController.autenticarUsuario);

//CERRAR SESION
app.get("/cerrar-sesion", loginController.cerrarSesion);

// RESTABLECER CONTRASEÑA
app.get("/reestablecer", usuarioController.formRestablecerContrasena);
app.post("/reestablecer", loginController.enviarToken);
app.get("/reestablecer/:token", loginController.formActualizarContrasena);
app.post("/reestablecer/:token", loginController.actualizarContrasena);

module.exports = app;
