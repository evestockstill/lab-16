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

  })
  // .put('/', (req, res, next) => {

  // })
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({
        path: 'reviews',
        select: '_id rating review',
        populate: {
          path: 'film',
          select: ' _id title'
        }
      })
      .then(reviewers => {
        res.send(reviewers);
      })
      .catch(next);
  });



