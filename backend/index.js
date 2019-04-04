"use strict";

const mongoose = require("mongoose");
const express = require("express");

const bodyParser = require("body-parser");
const logger = require("morgan");
const api = require("./api/api");

const API_PORT = 3001;
const app = express();

const router = express.Router();

app.use("/api", api);
// conexão com o MongoDB
const dbRoute =
  "mongodb://teste:teste123@ds064748.mlab.com:64748/calendario-escolar";

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () =>
  console.log("conexão com o banco de dados estabelecida com sucesso")
);

// checks if connection with the database is successful
db.on(
  "error",
  console.error.bind(console, "conexão com o banco de dados falhou")
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
