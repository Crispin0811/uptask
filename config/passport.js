const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//exportamos el modelo que vamos a necesitar para la autenticacion
const Usuario = require("../model/usuario");

passport.use(
  new localStrategy(
    {
      //como está en l modelo para la autenticación
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done,) => {
      try {
        const usuario = await Usuario.findOne({ where: { email: email } });
        const march = bcrypt.compareSync(password, usuario.password);
        if (!march) {
          return done(null, false, {
            message: "Password incorrecto",
          });
        }
        

        return done(null, usuario);
      } catch (error) {
        //ese usuario no existe
        return done(null, false, {
          message: "Esa cuenta no existe",
        });
      }
    }
  )
);

//serializar el usuario
passport.serializeUser((usuario, cb) => {
  cb(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario, cb) => {
  cb(null, usuario);
});

module.exports = passport;
