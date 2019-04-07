"use strict";

const express = require("express");

const autho = require("../middlewares/authorization");
const api = require("./log-eventos.api");
const router = express.Router();

router
  .route("/logs-eventos")
  .all(autho.requiresLocalLogin)
  .get((req, res, next) => {
    api
      .query(req.query)
      .then(logs => {
        res.send(logs);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    api
      .create(req.body, req.user._id)
      .then(log => {
        res.send(log);
      })
      .catch(next);
  });
module.exports = router;
