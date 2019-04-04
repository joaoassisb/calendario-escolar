"use strict";
require("../index");
const Usuario = require("../api/usuario/usuario.model");

Usuario.create({
  email: "teste@teste.com",
  name: "teste"
})
  .then(() => {
    console.log("usuário criado");
  })
  .catch(err => {
    console.log(err);
  });
