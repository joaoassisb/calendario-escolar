"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const ComentarioSchema = new Schema({
  data: {
    type: Date,
    required: true
  },
  texto: {
    type: String,
    trim: true,
    required: true
  },
  usuario: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  evento: {
    type: ObjectId,
    ref: "Evento",
    required: true
  }
});

module.exports = mongoose.model("Comentario", ComentarioSchema, "comentarios");
