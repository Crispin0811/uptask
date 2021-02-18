const passport = require("passport");
const Usuarios = require("../model/usuario");
const crypto = require("crypto");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const enviarEmail = require("../handlers/email");

const autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  //usar flash para mandar mensajes
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

//para ver si esta logeado o no
const usuarioAutenticado = (req, res, next) => {
  //si esta autenticado go
  if (req.isAuthenticated()) {
    return next();
  }

  //sino login
  return res.redirect("/iniciar-sesion");
};

const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};

// genera un token si el usuario es valido
const enviarToken = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    req.flash("error", "Esa cuenta no existe");
    return res.redirect("/reestablecer");
  }

  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.experiracion = Date.now() + 3600000;

  await usuario.save();
  // ${req.headers.host} => nombre del host
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

  // envia el correo con el token

  await enviarEmail.enviar({
    usuario,
    resetUrl,
    subject: "Cambiar Contraseña",
    archivo: "restablecerContrasena",
  });
};

const formActualizarContrasena = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuarios.findOne({ where: { token } });
  if (!usuario) {
    req.flash("error", "No valido");
    return res.redirect("/reestablecer");
  }

  res.render("actualizarContrasena", {
    nombrePagina: "Reestablecer Contraseña",
  });
};

const actualizarContrasena = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuarios.findOne({
    where: { token, experiracion: { [Op.gte]: Date.now() } },
  });

  if (!usuario) {
    req.flash("error", "No valido");
    return res.redirect("/reestablecer");
  }

  usuario.token = null;
  usuario.experiracion = null;
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  await usuario.save();
  req.flash("correcto", "tu Contraseña fue cambiado");
  res.redirect("/iniciar-sesion");
};

module.exports = {
  autenticarUsuario,
  usuarioAutenticado,
  cerrarSesion,
  enviarToken,
  formActualizarContrasena,
  actualizarContrasena,
};
