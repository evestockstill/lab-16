require('dotenv').config();

const mongoose = require('mongoose');
const Review = require('./Review');
const Film = require('./Film');
const Reviewer = require('./Reviewer');
const Studio = require('./Studio');
const Actor = require('./Actor');
const connect = require('../utils/connect');


describe('film rating', () => {
  let film;
  let review;
  let reviewer;
  let actor;
  let studio;

  beforeAll(() => {
    connect();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();

    studio = await Studio.create({
      name: 'Star Productions'
    });
    actor = await Actor.create({
      name: 'Sid'
    });

    reviewer = await Reviewer.create({
      name: 'Star Reviews',
      company: 'Star Reviews Production'
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

    review = await Review.create([{
      rating: 5,
      reviewer: reviewer._id,
      review: 'It was a killer movie',
      film: film._id
    }]);


  });

  it('requires a rating lower than 6', () => {
    const newReview = new Review({
      rating: 7,
      reviewer: reviewer._id,
      review: 'It was a killer movie',
      film: film._id
    });
    const { errors } = newReview.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (7) is more than maximum allowed value (5).');
  });

  it('requires a rating more than 0', () => {

    const newReview = new Review({
      rating: 0,
      reviewer: reviewer._id,
      review: 'It was a killer movie',
      film: film._id
    });
    const { errors } = newReview.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');

  });

});




// const reviewer = new Reviewer({
//   name: 'Star Reviews',
//   company: 'Star Reviews Production'
// });
// const film = new Film({
//   title: 'Devils Rejects',
//   studio: 'Star Productions',
//   released: 1978,
//   cast: [{
//     role: 'clown',
//     actor: 'Sid'
//   }]
// });
// const review = new Review({
//   rating: 0,
//   reviewer: reviewer._id,
//   review: 'It was a killer movie',
//   film: film._id
// });
//     const { errors } = review.validateSync();
//     expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
