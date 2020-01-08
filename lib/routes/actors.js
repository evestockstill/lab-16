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
      .populate('films', { _id: true, title: true, released: true })

      .select({ id: true,  name: true, dateOfBirth: true, placeOfBirth: true })
      .then(actors => res.send(actors))
      .catch(next);
  });
