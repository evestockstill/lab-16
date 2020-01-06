const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: [true, 'Must be a four digit year']
  },
  cast: [{
    role: String,
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: [true, 'must have actor']
    }
  }]
});







module.exports = mongoose.model('Film', schema);
