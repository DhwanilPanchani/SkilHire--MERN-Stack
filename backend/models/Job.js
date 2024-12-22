const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    hourlyRate: Number,
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);