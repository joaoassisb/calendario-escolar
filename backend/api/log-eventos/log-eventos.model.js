"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const LogEventosSchema = new Schema({
  data: {
    type: Date,
    required: true
  },
  usuario: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  turma: {
    type: ObjectId,
    ref: "Turma",
    required: true
  },
  evento: {
    type: ObjectId,
    ref: "Evento"
  },
  mensagem: {
    type: String
  },
  entradaEmTurma: {
    type: Boolean,
    defaul: false
  }
});

module.exports = mongoose.model("LogEventos", LogEventosSchema, "logs-eventos");
