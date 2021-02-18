const nodeMailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");
const path = require("path");

let transporter = nodeMailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ddf9f42b5026f2",
    pass: "9469d5cf33a25e",
  },
});

// GENEREAR HTML
const generarHtml = (archivo, opciones = {}) => {
  const pathHtml = path.join(__dirname, `../views/email/${archivo}.pug`);
  const html = pug.renderFile(pathHtml, opciones);
  return juice(html);
};

const enviar = async ( opciones ) => {
const html = generarHtml(opciones.archivo, opciones); 
const text = htmlToText.fromString(html)

  let info = transporter.sendMail({
    from: "Up Task <no-replay@uptask.com>",
    to: opciones.usuario.email,
    subject: opciones.subject,
    text,
    html
  });

  const enviarEmail = util.promisify(transporter.sendMail, transporter);
  return enviarEmail.call(transporter, info);
};

module.exports = {
  enviar,
};
