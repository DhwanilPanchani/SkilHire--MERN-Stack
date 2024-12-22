import React, { useState, useEffect } from 'react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/jobs');
            setJobs(response.data.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/jobs/${id}`);
            setJobs(jobs.filter((job) => job._id !== id));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleEdit = (id) => {
        // Navigate to an edit page or open a modal
        window.location.href = `/edit-job/${id}`;
    };

    return (
        <div className="job-list">
            {jobs.map((job) => (
                <div key={job._id} className="job-card">
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>Location: {job.location}</p>
                    <p>Hourly Rate: ${job.hourlyRate}</p>
                    <button onClick={() => handleEdit(job._id)}>Edit</button>
                    <button onClick={() => handleDelete(job._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default JobList;
