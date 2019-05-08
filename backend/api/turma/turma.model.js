"use strict";

const mongoose = require("mongoose");
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
  turmaId: {}
});

module.exports = mongoose.model("Turma", TurmaSchema, "turmas");
