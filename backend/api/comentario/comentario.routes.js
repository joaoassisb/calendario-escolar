"use strict";

const express = require("express");

const autho = require("../middlewares/authorization");
const api = require("./comentario.api");
const router = express.Router();

router
  .route("/comentarios")
  .all(autho.requiresLocalLogin)
  .get((req, res, next) => {
    api
      .query(req.query)
      .then(comentarios => {
        res.send(comentarios);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    api
      .create(req.body, req.user._id)
      .then(comentarios => {
        res.send(comentarios);
      })
      .catch(next);
  });
router.param("comentarioId", (req, res, next, id) => {
  api
    .get(id)
    .then(comentario => {
      req.comentario = comentario;
      next();
    })
    .catch(next);
});
router
  .route("/comentarios/:comentarioId")
  .all(autho.requiresLocalLogin)
  .get((req, res) => {
    res.send(req.comentario);
  })
  .post((req, res, next) => {
    api
      .update(req.comentario, req.body)
      .then(comentario => {
        res.send(comentario);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    api
      .delete(req.comentario)
      .then(() => {
        res.send({
          _id: req.params.comentarioId
        });
      })
      .catch(next);
  });

module.exports = router;
