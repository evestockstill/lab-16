const { Router } = require('express');
const Review = require('../Models/Review');

module.exports = Router()

  .post('/', (req, res, next) => {
    console.log(req.body)
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  });

