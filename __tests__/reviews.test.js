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
  it('creates a review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id,
        review: 'It was a killer movie',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer._id.toString(),
          review: 'It was a killer movie',
          film: film._id.toString(),
          __v: 0
        });
      });
  });
  // it('gets a review with a 100 limit', async() => {
    
  //   const reviews = await
  //   Review.create([
  //     { _id: review.id, rating: 5, review: 'Great', reviewer:  reviewer.id, film: { _id: film._id, title: film.title } },
  //     { _id: review.id, rating: 4, review: 'Great', reviewer: reviewer.name, film: { _id: film._id, title: film.title } },
  //     { _id: review.id, rating: 3, review: 'Great', reviewer: reviewer.name, film: { _id: film._id, title: film.title } },
  //     { _id: review.id, rating: 2, review: 'Great', reviewer: reviewer._id, film: { _id: film._id, title: film.title } }
  //   ]);
    
  //   return request(app)
  //     .get('/api/v1/reviews')
  //     .then(res => {
  //       reviews.forEach(review => {
  //         expect(res.body).toContainEqual({
  //           _id: review._id.toString(),
  //           rating: review.rating.toString(),
  //           review: review.review.toString(),
           
  //           film: [{
  //             _id: film._id.toString(), title: film.title.toString()
  //           }],
  //           reviewer: [{ _id: expect.any(String), name: reviewer.name

  //           }]
  //         });
  //       });
  //     });
  // });
  it('delete a review', () => {
    return request(app)
      .delete(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: review._id.toString(),
          rating: 5,
          reviewer: reviewer._id.toString(),
          review: 'It was a killer review',
          film: film._id.toString(),
          __v: 0
        });
      });
  });
});

