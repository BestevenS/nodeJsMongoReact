const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
    required: true
  },
  images: [String],
  videos: [String]
});

module.exports = mongoose.model('Property', PropertySchema);
