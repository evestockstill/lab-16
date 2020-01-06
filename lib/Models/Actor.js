const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  DateOfBirth: {
    type: Date,
  },
  PlaceOfBirth: {
    type: String
  }
});
