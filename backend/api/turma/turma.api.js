"use strict";

const createError = require("http-errors");
const Turma = require("./turma.model");

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
    console.log(filtros);
    return Turma.find(filtros).exec();
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
    return Turma.findById(id).then(turma => {
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
