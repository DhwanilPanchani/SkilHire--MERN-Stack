

    const express = require('express');
const { getAllJobs, getJobById, createJob, getMyJobs, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
 
const router = express.Router();
 
router.get('/', getAllJobs);
router.get('/current', protect, getMyJobs);
router.get('/:id', getJobById);
router.post('/create', protect, createJob);
router.put('/:id', updateJob); // Update Job
router.delete('/:id', deleteJob); // Delete Job
 
module.exports = router;