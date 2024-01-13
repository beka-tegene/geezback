const mongoose = require('mongoose');

const ExecutiveSchema = new mongoose.Schema({
    FullName: {
    type: String,
    required: true,
  },
  Position: {
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

const Executive = mongoose.model('Executive', ExecutiveSchema);

module.exports = Executive;
