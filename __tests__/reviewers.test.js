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
    studio = await Studio.create({
      name: 'Star',
      city: 'New York',
      state: 'New York',
      country: 'United States'
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
    reviewer = await Reviewer.create({
      name: 'Captain Spalding',
      company: 'Firefly reviews'
    });
    review = await Review.create({
      rating: 5,
      reviewer: reviewer._id,
      review: 'It was a killer review',
      film: film._id
    });
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Captain Spalding',
        company: 'Firefly reviews'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Captain Spalding',
          company: 'Firefly reviews',
          __v: 0
        });
      });
  });
  it('delete a reviewer', () => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
       
        expect(res.body).toEqual({
          _id: reviewer._id.toString(),
          name: 'Captain Spalding',
          company: 'Firefly reviews',
          __v: 0
        });
      });
  });
  it('updates a reviewer from patch', () => {
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Baby Spalding' })
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id.toString(),
          name: 'Baby Spalding',
          company: 'Firefly reviews',
          __v: 0
        });
      });
  });

  it('gets a reviewer by id', () => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: reviewer._id.toString(),
          name: reviewer.name,
          company: reviewer.company,
          reviews: [{
            _id: review._id.toString(),
            rating: review.rating,
            review: review.review,
            film: { _id: film._id.toString(), title: film.title },
            reviewer: reviewer._id.toString()
          }]
        });
      });
  });
});

