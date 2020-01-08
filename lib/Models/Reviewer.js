const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  id: false,
  toJSON: { virtuals: true }
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'review'
});



module.exports = mongoose.model('Reviewer', schema);
