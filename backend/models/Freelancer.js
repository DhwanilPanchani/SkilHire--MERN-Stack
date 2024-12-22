const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    bio: { type: String, required: true },
    jobRole: { type: String, required: true },
    skills: { type: [String], required: true },
    profilePhoto: { data: Buffer, contentType: String }, // Store photo as a buffer
    resume: { data: Buffer, contentType: String }, // Store resume as a buffer
}, { timestamps: true });

module.exports = mongoose.model('Freelancer', FreelancerSchema);