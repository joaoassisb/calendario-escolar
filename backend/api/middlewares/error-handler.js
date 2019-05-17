'use strict';

/* eslint no-console:0 no-unused-vars:0 */

const ignorableStatus = [401, 403, 404, 412];
const loggableErrors = [400, 500];

module.exports = (err, req, res, next) => {
  const { name } = err;
  let { message } = err;
  let status = err.status || 500;

  switch (name) {
    case 'CastError':
      if (err.path === '_id') {
        message = 'Não é possível encontrar o recurso. Identificador inválido';
        status = 404;
      } else {
        message = `Erro no tipo no atributo "${err.path}"`;
        status = 400;
      }
      break;

    case 'MongoError':
      if (/duplicate key error collection/.test(message)) {
        message = 'Não é possível cadastrar um registro duplicado';
        status = 412;
      }
      break;

    case 'ValidationError':
      message = `Valores inválidos não podem ser cadastrados! ${Object.entries(err.errors).map(
        ([, error]) => error.message
      )}`;
      status = 412;
      break;

    default:
      if (/(duplicate key error index|duplicate key error collection)/.test(err.message)) {
        status = 412;
        message = 'Não é possível cadastrar elementos/valores repetidos neste contexto';
      }
  }

  if (
    !ignorableStatus.includes(status) &&
    (process.env.NODE_ENV === 'development' || loggableErrors.includes(status))
  ) {
    console.error(err);
  }

  res.status(status).send(message);
};
