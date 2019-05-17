"use strict";

const express = require("express");
const glob = require("glob");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const sessionMiddleware = require("./middlewares/session");
const authMiddleware = require("./middlewares/authentication");
const autho = require("./middlewares/authorization");
const errorMiddleware = require("./middlewares/error-handler");

const routes = express.Router();
const session = {
  secret: "sdsdjnws84234ed,.wdasdx78werwjkab384",
  resave: false,
  saveUninitialized: false
};

routes.use(bodyParser.json());
routes.use(cookieParser());

routes.use(sessionMiddleware(session));

authMiddleware(routes, {
  userModelName: "Usuario"
});

routes.use(require(`${__dirname}/usuario/usuario.routes.js`));

routes.use(errorMiddleware);

glob.sync(`${__dirname}/**/*.routes.js`).forEach(filename => {
  routes.use(require(filename));
});

module.exports = routes;
