"use strict";

const mongoose = require("mongoose");
const createError = require("http-errors");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const TurmaSchema = new Schema({
  dataCriacao: {
    type: Date,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  usuarioCriador: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  alunos: [
    {
      type: ObjectId,
      ref: "Usuario",
      required: true
    }
  ],
  materias: [
    {
      nome: String
    }
  ],
  codigo: {
    type: String,
    unique: true
  }
});

TurmaSchema.pre("save", function() {
  if (!this.isNew) {
    return;
  }

  this.codigo = makeRandomCode(8);
  return;
});

TurmaSchema.pre("remove", function() {
  const Evento = this.model("Evento");

  return Evento.countDocuments({
    turma: this._id
  }).then(eventos => {
    if (eventos > 0) {
      throw createError(
        412,
        "Turma não pode ser excluída porque possui eventos cadastrados"
      );
    }

    return;
  });
});

function makeRandomCode(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports = mongoose.model("Turma", TurmaSchema, "turmas");
