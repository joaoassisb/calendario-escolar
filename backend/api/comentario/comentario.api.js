"use strict";

const createError = require("http-errors");
const Comentario = require("./comentario.model");

module.exports = {
  query(filtros) {
    return Comentario.find(filtros)
      .populate("usuario evento")
      .exec();
  },
  create(data) {
    const comentario = new Comentario(data);

    return comentario.save();
  },
  get(id) {
    return Comentario.findById(id).then(comentario => {
      if (!comentario) {
        throw createError(404, "Comentário não encontrado");
      }

      return comentario;
    });
  },
  update(comentario, data) {
    Object.assign(comentario, data);

    return comentario.save();
  },
  delete(comentario) {
    return comentario.remove();
  }
};
