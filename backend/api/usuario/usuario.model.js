"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true
    },
    required: true,
    validate: [
      /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/,
      "Email inválido"
    ],
    toCSV: true
  },
  name: {
    type: String,
    toCSV: true
  },
  hashedPassword: {
    type: String,
    select: false
  },
  salt: {
    type: String,
    select: false
  },
  registeredAt: {
    type: Date
  },
  lastLogin: {
    type: Date
  },
  social: {
    facebook: String
  }
});

UsuarioSchema.virtual("password").set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
});

UsuarioSchema.method({
  legacyAuthenticate(plainText) {
    return bcrypt.compareSync(plainText, this.encrypted_password);
  },
  authenticate(plainText) {
    const encryptedPassword = this.encryptPassword(plainText);

    return encryptedPassword === this.hashedPassword;
  },
  makeSalt() {
    return crypto.randomBytes(16).toString("base64");
  },
  encryptPassword(password) {
    if (!password || !this.salt) {
      return "";
    }

    const salt = new Buffer(this.salt, "base64");

    return crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha1")
      .toString("base64");
  },
  updateLoginInfo() {
    this.lastLogin = Date.now();

    return this.save();
  }
});

UsuarioSchema.static({
  findByEmailToAuth(email) {
    return this.findOne(
      {
        email: email
      },
      "+salt +hashedPassword +encrypted_password"
    ).exec();
  }
});

module.exports = mongoose.model("Usuario", UsuarioSchema, "usuarios");
