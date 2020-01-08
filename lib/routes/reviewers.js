const { Router } = require('express');
const Reviewer = require('../Models/Reviewer');

module.exports = Router()

  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Reviewer.findByIdAndDelete(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);

  });


