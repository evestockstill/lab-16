const { Router } = require('express');
const Studio = require('../Models/Studio');

module.exports = Router()

  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })
  .get('/', async(req, res, next) => {
    let query = {};
    if(req.query.studio) {
      query = { 'studio.name': req.query.studio };
    }
    Studio
      .find(query)
      .select({ name: true })
      .then(studios => res.send(studios));
  });
