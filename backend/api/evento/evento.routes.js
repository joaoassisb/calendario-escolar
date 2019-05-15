"use strict";

const express = require("express");
//fixme
// const autho = require("../middlewares/authorization");
const api = require("./evento.api");
const router = express.Router();

router
  .route("/eventos")
  // .all(autho.requiresLocalLogin)
  .get((req, res, next) => {
    api
      .query(req.query)
      .then(eventos => {
        res.send(eventos);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    api
      .create(req.body, req.user._id)
      .then(evento => {
        res.send(evento);
      })
      .catch(next);
  });
router.param("eventoId", (req, res, next, id) => {
  api
    .get(id)
    .then(evento => {
      req.evento = evento;
      next();
    })
    .catch(next);
});
router
  .route("/eventos/:eventoId")
  .get((req, res) => {
    res.send(req.evento);
  })
  .post((req, res, next) => {
    api
      .update(req.evento, req.body)
      .then(evento => {
        res.send(evento);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    api
      .delete(req.evento)
      .then(() => {
        res.send({
          _id: req.params.eventoId
        });
      })
      .catch(next);
  });

module.exports = router;
