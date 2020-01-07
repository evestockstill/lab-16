const { Router } = require('express');
const Actor = require('../Models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('films')
      .then(actor => res.send(actor))
      .catch(next);
  });
