const { Router } = require('express');
const Review = require('../Models/Review');

module.exports = Router()

  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Review.findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);

  });