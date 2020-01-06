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
  country: [String]
}, {
  id:false,
  toJSON: { virtuals: true }
});
schema.virtual('studio', {
  ref: 'Studio',
  localField: '_id',
  foreignField: 'studio'
});




module.exports = mongoose.model('studio', schema);
