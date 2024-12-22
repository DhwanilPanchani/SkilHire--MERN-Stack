import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await apiClient.get(`/jobs/${id}`);
                setJob(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobDetails();
    }, [id]);

    return (
        <div className="container mt-5">
            {job ? (
                <>
                    <h2>{job.title}</h2>
                    <p>{job.description}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Hourly Rate:</strong> ${job.hourlyRate}</p>
                </>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
};

export default JobDetails;