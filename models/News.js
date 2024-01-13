const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  newsTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const news = mongoose.model('News', newsSchema);

module.exports = news;
