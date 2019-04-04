"use strict";

const createError = require("http-errors");
const Comentario = require("./comentario.model");

module.exports = {
  query(filtros) {
    return Promise.all([
      Comentario.find(filtros)
        .populate("usuario", "name")
        .exec(),
      Comentario.countDocuments(filtros).exec()
    ]).then(([result, total]) => ({
      total,
      result
    }));
  },
  create(data, usuario) {
    const comentario = new Comentario({
      ...data,
      usuario
    });

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
