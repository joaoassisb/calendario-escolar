"use strict";

const createError = require("http-errors");
const LogEvento = require("./log-eventos.model");

module.exports = {
  query(filtros) {
    if (!filtros.turma) {
      throw createError(400, "Informe uma turma para listar suas atividades.");
    }

    return LogEvento.find(filtros).exec();
  },
  create(data, usuario) {
    const evento = new LogEvento({
      ...data,
      usuario: usuario
    });

    return evento.save();
  },
  get(id) {
    return evento.findById(id).then(evento => {
      if (!evento) {
        throw createError(404, "Log não encontrado");
      }

      return evento;
    });
  },
  delete(evento) {
    return evento.remove();
  }
};
