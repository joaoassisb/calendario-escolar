"use strict";

const express = require("express");

const autho = require("../middlewares/authorization");
const api = require("./turma.api");
const router = express.Router();

router
  .route("/turmas")
  .get((req, res, next) => {
    api
      .query({
        ...req.query,
        usuario: req.user._id
      })
      .then(turmas => {
        res.send(turmas);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    api
      .create(req.body, req.user)
      .then(turmas => {
        res.send(turmas);
      })
      .catch(next);
  });

router.route("/turmas/alunos").post((req, res, next) => {
  api
    .entrar(req.body, req.user._id)
    .then(turma => {
      res.send(turma);
    })
    .catch(next);
});

router.param("turmaId", (req, res, next, id) => {
  api
    .get(id)
    .then(turma => {
      req.turma = turma;
      next();
    })
    .catch(next);
});
router
  .route("/turmas/:turmaId")
  .get((req, res) => {
    res.send(req.turma);
  })
  .post((req, res, next) => {
    api
      .update(req.turma, req.body)
      .then(turma => {
        res.send(turma);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    api
      .delete(req.turma)
      .then(() => {
        res.send({
          _id: req.params.turmaId
        });
      })
      .catch(next);
  });

router.route("/turmas/:turmaId/sair").post((req, res, next) => {
  api
    .sair(req.turma, req.body)
    .then(turma => {
      res.send(turma);
    })
    .catch(next);
});

module.exports = router;
