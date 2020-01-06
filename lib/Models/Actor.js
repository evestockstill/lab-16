const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  PlaceOfBirth: {
    type: String
  }
});

module.exports = mongoose.model('actor', schema);
