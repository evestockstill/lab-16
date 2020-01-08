const { Router } = require('express');
const Film = require('../Models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('reviews')
      // .populate({
      //   path: 'reviews',
      //   select: '_id',
      //   populate: {
      //     path: 'reviewer',
      //     select: '_id name'
      //   }
      // })
      .then(film => {
      
        
        res.send(film);
      })
      .catch(next);
  });
  

