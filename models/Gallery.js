const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
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

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;
