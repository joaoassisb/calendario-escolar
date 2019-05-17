"use strict";

const createError = require("http-errors");
const Turma = require("./turma.model");
const LogsEventos = require("../log-eventos/log-eventos.model");

module.exports = {
  query({ usuario, ...filtros }) {
    if (usuario) {
      filtros = {
        $or: [
          {
            usuarioCriador: usuario
          },
          {
            alunos: usuario
          }
        ]
      };
    }

    return Turma.find(filtros).exec();
  },
  entrar(turma, usuarioId) {
    return Turma.findOne(turma).then(turma => {
      if (!turma) {
        return;
      }

      turma.alunos.addToSet(usuarioId);

      return turma.save();
    });
  },
  sair(turma, { aluno }) {
    turma.alunos.pull(aluno);
    return turma.save();
  },
  create(data, usuario) {
    const turma = new Turma({
      ...data,
      usuarioCriador: usuario,
      dataCriacao: Date.now()
    });

    return turma.save();
  },
  get(id) {
    return Turma.findById(id)
      .populate("alunos")
      .then(turma => {
        if (!turma) {
          throw createError(404, "Turma não encontrada");
        }

        return turma;
      });
  },
  update(turma, data) {
    Object.assign(turma, data);

    return turma.save();
  },
  delete(turma) {
    return turma.remove();
  }
};
