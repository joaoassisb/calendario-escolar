"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const EventoSchema = new Schema({
  data: {
    type: String,
    required: true
  },
  usuarioCriador: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  titulo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Evento", EventoSchema, "eventos");
