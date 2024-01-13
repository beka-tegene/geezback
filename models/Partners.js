const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    PartnerName: {
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

const partner = mongoose.model('Partner', PartnerSchema);

module.exports = partner;
