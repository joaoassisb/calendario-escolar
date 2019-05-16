"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const EventoSchema = new Schema({
  turma: {
    type: ObjectId,
    ref: "Turma",
    required: true
  },
  data: {
    type: String,
    required: true
  },
  usuarioCriador: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ["Prova", "Atividade", "Apresentação/Seminário", "Trabalho Prático"]
  },
  pontos: {
    type: Number
  },
  materia: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Evento", EventoSchema, "eventos");
