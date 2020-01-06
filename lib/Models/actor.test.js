const mongoose = require('mongoose');
const Actor = require('./Actor');

describe('Actor Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const actor = new Actor({
        dateOfBirth: Date,
        placeOfBirth: 'Santa Clara'
      });
      const { errors } = actor.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
});
