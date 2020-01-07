require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/Models/Studio');
const Film = require('../lib/Models/Film');
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
  let film;
  beforeEach(async () => {
    studio = await Studio.create({
      name: 'Star',
      city: 'New York',
      state: 'New York',
      country: 'United States'
    });
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
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Star',
        city: 'New York',
        state: 'New York',
        country: 'United States'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Star',
          city: 'New York',
          state: 'New York',
          country: 'United States',
          __v: 0
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await Studio.create([
      { name: 'first studio', city: 'its one city', state: 'California', country: 'USA' },
      { name: 'second studio', city: 'its two city', state: 'New York', country: 'USA' },
      { name: 'third studio', city: 'its three city', state: 'Oregon', country: 'USA' }
    ]);
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id.toString(),
            name: studio.name
          });
        });
      });
  });
  it('gets a studio by id', async() => {
   
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
       
        expect(res.body).toEqual({
          _id: studio._id.toString(),
          name: 'Star',
          city: 'New York',
          state: 'New York',
          country: 'United States',
          films: [{ _id: film._id.toString(), title: film.title, studio: studio._id.toString() }],
          // actor: actor.id,
          __v: 0
        });
      });
  });
});

