require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/Models/Studio');
const Film = require('../lib/Models/Film');
const Reviewer = require('../lib/Models/Reviewer');
const Review = require('../lib/Models/Review');
const Actor = require('../lib/Models/Actor');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let review;
  let reviewer;
  let studio;
  let actor;
  let film;
  beforeEach(async() => {
    actor = await Actor.create({
      name: 'Adam Driver',
      dateOfBirth: new Date(),
      placeOfBirth: 'Santa Clara'
    });
    film = await Film.create({
      title: 'Devils Rejects',
      studio: studio._id,
      released: 1978,
      cast: [{
        role: 'clown',
        actor: actor._id
      }]
    });
    review = await Review.create({
      name: 'Captain Spalding',
      company: 'Firefly reviews'
    });
    review = await Review.create({
      rating: 5,
      reviewer: reviewer.id,
      review: 'It was a killer movie',
      film: film.id
    });
  });
});
