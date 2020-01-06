/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Reviewer = require('./Reviewer');


describe('Reviewer Model', () => {
  describe('name', () => {
    it('requires a name', () => {
      const reviewer = new Reviewer({
        company: 'Star Film Review'
      });
      const { errors } = reviewer.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });
  describe('company', () => {
    it('requires a company', () => {
      const reviewer = new Reviewer({
        name: 'Star Smith'
      });
      const { errors } = reviewer.validateSync();
      expect(errors.company.message).toEqual('Path `company` is required.');
    });
  });
});
