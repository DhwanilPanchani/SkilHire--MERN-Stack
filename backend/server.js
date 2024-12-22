require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('./database/connection'); // Existing connection
const freelancerRoutes = require('./routes/freelancerRoutes'); 
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const jobRoutes = require('./routes/jobRoutes');

const app = express(); // Initialize app before using it

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow requests from your frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api/freelancer', freelancerRoutes);
app.use('/api/auth', authRoutes); // Use the auth routes here

app.use('/api/jobs', jobRoutes);
// app.use('/api/freelancers', freelancerRoutes);

// Static files (Optional: If serving the frontend from the same server)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
});
