const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    coverLetter:{
        type: String,
        default: ''
    },
    status:{
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected' ],
    default: 'pending'
    }
}, { timestamps: true});

module.exports = mongoose.model('Application', ApplicationSchema);