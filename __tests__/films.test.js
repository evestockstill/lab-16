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
  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Star'
    });
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
});


