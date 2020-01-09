const { Router } = require('express');
const Review = require('../Models/Review');

module.exports = Router()

  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })
  // .get('/', async(req, res, next) => {
  //   const { first = 1, second = 2 } = req.query;
  //   Review
  //     .find()
  //     .limit(100)
  //     .sort(-1)
  //     .skip((Number(first) - 1) * Number(second))
  //     .then(topDrama => res.send(topDrama))
  //     .catch(next);
   
  // })
  .delete('/:id', (req, res, next) => {
    Review.findByIdAndDelete(req.params.id)  
      .then(review => res.send(review))
      .catch(next);
  });
