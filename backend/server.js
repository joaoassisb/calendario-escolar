"use strict";

const path = require("path")
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
  "mongodb://joao:joao123@ds064748.mlab.com:64748/calendario-escolar";

mongoose.connect(dbRoute, {
  autoReconnect: true,

  poolSize: 20,
  socketTimeoutMS: 480000,
  keepAlive: 300000,

  keepAliveInitialDelay: 300000,
  connectTimeoutMS: 30000,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true
});

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

app.use(express.static(path.join(__dirname, '../frontend/public')))
app.use("/api", router);

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, '../frontend/public','index.html'))
})

module.exports = {
  app: app,
  port: process.env.PORT || 8080
}; 


