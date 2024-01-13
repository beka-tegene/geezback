const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    ReportName: {
        type: String,
        required: true,
    },
    report: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
