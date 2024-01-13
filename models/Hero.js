const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    ImageName: {
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

const Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;
