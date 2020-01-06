const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  }
});

module.exports = mongoose.model('studio', schema);
