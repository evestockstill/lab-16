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
  let studio;
  let actor;
  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Star'
    });
    actor = await Actor.create({
      name: 'Adam Driver',
      dateOfBirth: 'may 29',
      placeOfBirth: 'Santa Clara'
    })
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Devils Rejects',
        studio,
        released: 1978
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Devils Rejects',
          studio: studio._id.toString(),
          released: 1978,
          cast: [],
          __v: 0
        });
      });
  });
  it('can get film by id', async() => {
    const film = await Film.create({
      title: 'Devils Rejects',
      studio: studio._id,
      released: 1978,
      cast: [{
        role: 'clown',
        actor: actor._id
      }]
    });
  
    const reviewer = await Reviewer.create({
      name: 'Captain Spalding',
      company: 'Firefly reviews'
    });
    const review = await Review.create({
      rating: 5,
      reviewer: reviewer._id,
      review: 'It was a killer review',
      film: film._id
    });
    
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({

          __v: 0,
          _id: film._id.toString(),
          title: film.title,
          released: film.released,
          studio: studio._id.toString(),
          cast: [{
            _id: expect.any(String),
            role: 'clown',
            actor: expect.any(String)

          }],
          reviews: [{
            _id: expect.any(String),
            rating: review.rating,
            reviewer: { _id: expect.any(String), name: reviewer.name },
            film: expect.any(String)
          }]

        });
      });
  });

  
});


