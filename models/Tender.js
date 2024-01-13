const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  tenderTitle: {
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

const tender = mongoose.model('Tender', tenderSchema);

module.exports = tender;
