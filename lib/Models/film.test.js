// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Film = require('./Film');
const Studio = require('./Studio');


describe('Film model', () => {
  it('has a required title', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Please add a title');
  });
  it('has a required studioId', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });
  it('has a required cast', () => {
    const studio = new Studio({
      name: 'Star Productions'
    });
    const film = new Film({
      title: 'Devils Rejects',
      studio: studio._id,
      released: 1978,
      cast: [{
        role: 'clown'
      }]
    });
    const { errors } = film.validateSync();
  
    expect(errors['cast.0.actor'].message).toEqual('must have actor');
  });
  it('has a required date of four digits', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Must be a four digit year');
  });
});

