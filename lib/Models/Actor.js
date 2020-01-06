const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  PlaceOfBirth: [String]
}, {
  id: false,
  toJSON: { virtuals: true }
});
schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'filmId'
});


module.exports = mongoose.model('actor', schema);

