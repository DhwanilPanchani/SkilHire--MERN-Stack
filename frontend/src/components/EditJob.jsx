import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
        hourlyRate: '',
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`/api/jobs/${id}`);
                setJobData(response.data.data);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };
        fetchJob();
    }, [id]);

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/jobs/${id}`, jobData);
            navigate('/explore-talents'); // Redirect after successful edit
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                placeholder="Job Title"
            />
            <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                placeholder="Job Description"
            ></textarea>
            <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="Location"
            />
            <input
                type="number"
                name="hourlyRate"
                value={jobData.hourlyRate}
                onChange={handleChange}
                placeholder="Hourly Rate"
            />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditJob;
