const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    DocumentName: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
     
const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;
