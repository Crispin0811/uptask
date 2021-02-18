const bcrypt = require("bcrypt");
const Usuarios = require("../model/usuario");
const formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en UPTASK",
  });
};

const formIniciarSesion = (req, res) => {
  const { error } = res.locals.mensajes;
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesión",
    error,
  });
};

const crearCuenta = async (req, res) => {
  const body = req.body;

  try {
    await Usuarios.create({
      email: body.email,
      password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    });
    res.redirect("/iniciar-sesion");
  } catch (error) {
    console.log(error.errors[0].message);
    console.log(error.errors[0]);
    req.flash(
      "error",
      error.errors.map((e) => {
        e.message;
      })
    );
    res.render("crearCuenta", {
      nombrePagina: "Crear cuenta en UPTASK",
      mensajes: req.flash(),
      email: body.email,
      password: body.password,
    });
  }
};

const formRestablecerContrasena = (req, res) => {
  res.render("reestablecer", {
    nombrePagina: "Reestablecer Contraseña",
  });
};



module.exports = {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
  formRestablecerContrasena,
  
};
