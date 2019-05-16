"use strict";

const createError = require("http-errors");
const LogEvento = require("./log-eventos.model");
const Usuario = require("../usuario/usuario.model");

module.exports = {
  query(filtros) {
    if (!filtros.turma) {
      throw createError(400, "Informe uma turma para listar suas atividades.");
    }

    return LogEvento.find(filtros)
      .populate("usuario evento")
      .exec();
  },
  create(data, usuario) {
    const log = new LogEvento({
      ...data,
      usuario: usuario,
      data: new Date()
    });

    return Usuario.findById(usuario).then(usuario => {
      log.mensagem = `${usuario.nome} ${log.mensagem}`;
      return log.save();
    });
  },
  get(id) {
    return log.findById(id).then(log => {
      if (!log) {
        throw createError(404, "Log não encontrado");
      }

      return log;
    });
  },
  delete(log) {
    return log.remove();
  }
};
