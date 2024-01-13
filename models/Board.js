const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
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

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
