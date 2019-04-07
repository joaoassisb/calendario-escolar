'use strict';

const mongoose = require('mongoose');
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
    ref: 'Usuario',
    required: true
  },
  documento: {
    type: ObjectId,
    refPath: 'modelo',
    required: true
  },
  modelo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Comentario', ComentarioSchema, 'comentarios');