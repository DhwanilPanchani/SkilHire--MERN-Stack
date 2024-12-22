const Freelancer = require('../models/Freelancer'); // Adjust the path if needed
//Get all freelancers
const getAllFreelancers = async (req, res) => {
    try {
        const freelancers = await Freelancer.find();
        res.status(200).json({ data: freelancers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching freelancers', error });
    }
};
const getFreelancerProfile = async (req, res) => {
    try {
        const freelancer = await Freelancer.findOne({ user: req.user.id });
 
        if (!freelancer) {
            return res.status(404).json({ success: false, message: 'Freelancer profile not found.' });
        }
 
        // Convert buffer to base64 for display purposes
        const profilePhoto = freelancer.profilePhoto
            ? `data:${freelancer.profilePhoto.contentType};base64,${freelancer.profilePhoto.data.toString('base64')}`
            : null;
 
        const resume = freelancer.resume
            ? `data:${freelancer.resume.contentType};base64,${freelancer.resume.data.toString('base64')}`
            : null;
 
        res.status(200).json({
            success: true,
            data: {
                ...freelancer._doc,
                profilePhoto,
                resume,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 
 
 
// Update Freelancer Profile
const updateFreelancerProfile = async (req, res) => {
    try {
        const freelancer = await Freelancer.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
 
        if (!freelancer) {
            return res.status(404).json({ success: false, message: 'Freelancer profile not found' });
        }
 
        res.status(200).json({ success: true, data: freelancer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 
const createFreelancerProfile = async (req, res) => {
    try {
        const { name, location, hourlyRate, bio, jobRole, skills } = req.body;
 
        if (!name || !location || !hourlyRate || !bio || !jobRole || !skills) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
 
        // Parse skills if sent as a string
        const parsedSkills = Array.isArray(skills) ? skills : JSON.parse(skills);
 
        // Prepare files (buffer)
        const profilePhoto = req.files?.profilePhoto?.[0] || null;
        const resume = req.files?.resume?.[0] || null;
 
        // Create the freelancer object
        const freelancer = new Freelancer({
            user: req.user.id,
            name,
            location,
            hourlyRate,
            bio,
            jobRole,
            skills: parsedSkills,
            profilePhoto: profilePhoto
                ? { data: profilePhoto.buffer, contentType: profilePhoto.mimetype }
                : undefined,
            resume: resume ? { data: resume.buffer, contentType: resume.mimetype } : undefined,
        });
 
        await freelancer.save();
 
        res.status(201).json({
            success: true,
            message: 'Freelancer profile created successfully.',
            data: freelancer,
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
 
 
module.exports = {
    getFreelancerProfile,
    updateFreelancerProfile,
    createFreelancerProfile,
    getAllFreelancers,
};