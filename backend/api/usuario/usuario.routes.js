"use strict";

const express = require("express");
const router = express.Router();

const autho = require("../middlewares/authorization");
const api = require("./usuario.api");

router.route("/usuarios").post((req, res, next) => {
  api
    .create(req.body)
    .then(usuario => {
      res.send(usuario);
    })
    .catch(next);
});

router.param("usuarioId", (req, res, next, id) => {
  api
    .get(id)
    .then(usuario => {
      req.usuario = usuario;
      next();
    })
    .catch(next);
});

router
  .route("/usuarios/:usuarioId")
  .all(autho.requiresLocalLogin)
  .get((req, res) => {
    res.send(req.usuario);
  })
  .post((req, res, next) => {
    api
      .update(req.usuario, req.body)
      .then(usuario => {
        res.send(usuario);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    api
      .delete(req.usuario)
      .then(() => {
        res.send({
          _id: req.params.usuarioId
        });
      })
      .catch(next);
  });

module.exports = router;
