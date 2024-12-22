const express = require('express');
const { getFreelancerProfile, updateFreelancerProfile, createFreelancerProfile, getAllFreelancers } = require('../controllers/freelancerController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer'); // For file uploads
// const { getAllFreelancers } = require('../controllers/freelancerController');

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

router.route('/profile')
    .get(protect, getFreelancerProfile)
    .put(protect, updateFreelancerProfile);

//GET route to get all freelancers
router.get('/', getAllFreelancers);

// POST route to create a freelancer profile
router.post(
    '/profile',
    protect,
    upload.fields([
        { name: 'profilePhoto', maxCount: 1 },
        { name: 'resume', maxCount: 1 },
    ]),
    createFreelancerProfile
);
console.log('Loading freelancerController.js');

module.exports = router;