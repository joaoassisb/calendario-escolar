"use strict";

const createError = require("http-errors");
const Usuario = require("./usuario.model");

module.exports = {
  query(filtros) {
    return Usuario.find(filtros).exec();
  },
  create(data) {
    const usuario = new Usuario(data);

    return usuario.save();
  },
  get(usuarioId) {
    return Usuario.findById(usuarioId).then(usuario => {
      if (!usuario) {
        throw createError(404, "Usuário não encontrado");
      }

      return usuario;
    });
  },
  update(usuario, data) {
    Object.assign(usuario, data);
    return usuario.save();
  },
  remove(usuario) {
    return usuario.remove();
  }
};
