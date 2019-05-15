"use strict";

const createError = require("http-errors");
const Evento = require("./evento.model");

module.exports = {
  query(filtros) {
    if (!filtros.turma) {
      throw createError(400, "Informe uma turma para listar seus eventos");
    }

    return Evento.find(filtros).exec();
  },
  create(data, usuario) {
    const evento = new Evento({
      ...data,
      usuarioCriador: usuario
    });

    return evento.save();
  },
  get(id) {
    return Evento.findById(id).then(evento => {
      if (!evento) {
        throw createError(404, "Evento não encontrado");
      }

      return evento;
    });
  },
  update(evento, data) {
    Object.assign(evento, data);

    return evento.save();
  },
  delete(evento) {
    return evento.remove();
  }
};
