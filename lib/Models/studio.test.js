// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Studio = require('./Studio');

describe('Studio Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const studio = new Studio({
        city: 'Los Angeles',
        state: 'California',
        country: 'USA'
      });
      const { errors } = studio.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
});
