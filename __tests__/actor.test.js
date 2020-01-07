require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/Models/Actor');

describe('actor routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let actor;
  let dateOfBirth;
  beforeEach(async() => {
    actor = await Actor.create({
      name: 'Adam Driver',
      dateOfBirth,
      placeOfBirth: 'Santa Clara'
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
});
