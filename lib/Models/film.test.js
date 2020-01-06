const mongoose = require('mongoose');
const Film = require('./Film');

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
});
