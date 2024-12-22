const Job = require('../models/Job');

// Get All Jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer', 'name email');
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Job By ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'name email');

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Create job 
const createJob = async (req, res) => {
    try {
        const { title, description, location, hourlyRate } = req.body;
        const userId = req.user._id;
        const job = new Job({
            title,
            description,
            location,
            hourlyRate,
            employer: userId,
        });
        const savedJob = await job.save();
        res.status(201).json({ data: savedJob });
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error });
    }
};
const getMyJobs = async (req, res) => {
    try{
        console.log(req.user._id);
        
        const userId = req.user._id;
        const response = await Job.find({employer: userId})
        res.status(201).json({ data: response});
    }
    catch(error){
        res.status(500).json({ message: 'Error getting jobs', error });
    }
}

const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
 
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
 
        res.status(200).json({ success: true, data: updatedJob });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 
const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await Job.findByIdAndDelete(jobId);
 
        if (!deletedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
 
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 

module.exports = { getAllJobs, getJobById, createJob, getMyJobs, updateJob, deleteJob };

// module.exports = { getAllJobs, getJobById , createJob, getMyJobs };
