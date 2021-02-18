const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
require("dotenv").config({ path: "variables.env" });

const helpers = require("./helpers");

//PARA LA BASE DE DATOS
const db = require("./config/db");

//exportando los modelos
require("./model/Proyecto");
require("./model/Tareas");
require("./model/usuario");

db.sync()
  .then(() => {
    console.log("CONECTADO A BASE DE DATOS");
  })
  .catch((e) => {
    console.log(e);
  });
//PARA LA BASE DE DATOS

//para bodyParse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//para bodyParse

//para setear las archivos estaticos
app.use(express.static("public"));

//para PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
//para PUG

//agregar flash
app.use(flash());

app.use(cookieParser());

app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

//agregando passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.varDom = helpers.varDom;
  res.locals.mensajes = req.flash();
  res.locals.usuario = { ...req.user } || null;
  next();
});

app.use(require("./routes/index"));

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("corriendo en el puerto 3000");
  }
});
