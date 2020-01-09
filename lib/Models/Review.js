const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Rating must be 1-5'],
    min: 1,
    max: 5

  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    required: [true, 'Please add a review'],
    maxlength: [140, 'Review can not be more than 140 characters']
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});
schema.statics.top100Films = function() {
  return this.ag
}


module.exports = mongoose.model('Review', schema);

