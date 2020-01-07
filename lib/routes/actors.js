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

    // /POPULATE MOVIES
    Actor
      .findById(req.params.id)
      .populate('films', { _id: true, name: true })
      .then(actors => res.send(actors))
      .catch(next);
  });
