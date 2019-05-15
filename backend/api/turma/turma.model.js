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
  materias: [
    {
      nome: String
    }
  ],
  codigo: String
});

TurmaSchema.pre("save", function() {
  if (!this.isNew) {
    return;
  }

  this.codigo = makeRandomCode(8);
  return;
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
