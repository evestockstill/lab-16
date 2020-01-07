require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/Models/Actor');
const Film = require('../lib/Models/Film');

describe('actor routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let actor;
  let film;
  let dateOfBirth;
  beforeEach(async() => {
    actor = await Actor.create({
      name: 'Adam Driver',
      dateOfBirth,
      placeOfBirth: 'Santa Clara'
    });
    // film = await Film.create(
    //   {
    //     title: 'Devils Rejects',
    //     studio: studio._id,
    //     released: 1978,
    //     cast: [{
    //       role: 'clown',
    //       actor: actor._id
    //     }]
    //   });
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
  it('can get an actor by id', async() => {
    
    const dateOfBirth = new Date();
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id.toString(),
          name: 'Adam Driver',
          dateOfBirth,
          placeOfBirth: 'Santa Clara',
          films: JSON.parse(JSON.stringify(films)),
          __v:0
        });
      });
  });
});


