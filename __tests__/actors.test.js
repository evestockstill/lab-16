require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/Models/Actor');
const Film = require('../lib/Models/Film');
const Studio = require('../lib/Models/Studio');



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
  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Star',
      city: 'New York',
      state: 'New York',
      country: 'United States'
    });
    actor = await Actor.create({
      name: 'Adam Driver',
      dateOfBirth: 'May 29',
      placeOfBirth: 'Santa Clara',

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

  it('can create a new actor', () => {
    const dateOfBirth = new Date();
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Adam Driver',
        dateOfBirth,
        placeOfBirth: 'Santa Clara'

      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Adam Driver',
          dateOfBirth: dateOfBirth.toISOString(),
          placeOfBirth: 'Santa Clara',

          __v: 0
        });
      });
  });
  it('can get an actor by id', () => {
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id.toString(),
          name: actor.name,
          dateOfBirth: expect.any(String),
          placeOfBirth: actor.placeOfBirth,
          __v: 0,
          films: [{
            _id: film._id.toString(),
            title: film.title,
            released: film.released
          }]
        });
      });
  });
  it('gets all actors', async() => {
    const actors = await Actor.create([
      { name: 'actor 1', dateOfBirth: '1/3/2020', placeOfBirth: 'Oregon' },
      { name: 'actor 2', dateOfBirth: '1/3/2020', placeOfBirth: 'Washington' },
      { name: 'actor 3', dateOfBirth: '1/3/2020', placeOfBirth: 'California' }
    ]);
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id.toString(),
            name: actor.name,
            dateOfBirth: actor.dateOfBirth.toISOString(),
            placeOfBirth: actor.placeOfBirth,
            __v: 0
          });
        });
      });
  });
});


