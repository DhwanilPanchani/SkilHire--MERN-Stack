import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Pagination, Button } from '@mui/material';
import apiClient from '../api/apiClient';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3; // Set the number of jobs to display per page

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await apiClient.get('/jobs/current', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token as a Bearer token
                    },
                });
                setJobs(response.data.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Failed to load jobs.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Paginate jobs based on the current page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    if (loading) return <Typography>Loading jobs...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box
            sx={{
                height: '100vh',
                backgroundImage: 'url("https://images.pexels.com/photos/8547197/pexels-photo-8547197.jpeg?auto=compress&cs=tinysrgb&w=1600")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 2,
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, color: 'white' }}>
                My Posted Jobs
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 2,
                    padding: 2,
                }}
            >
                {currentJobs.length === 0 ? (
                    <Typography>No jobs posted yet.</Typography>
                ) : (
                    currentJobs.map((job) => (
                        <Card key={job.id} sx={{ boxShadow: 3, borderRadius: 2, mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {job.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Location: {job.location}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {job.description}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Hourly Rate: ${job.hourlyRate}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>

            {/* Pagination */}
            {jobs.length > jobsPerPage && (
                <Pagination
                    count={Math.ceil(jobs.length / jobsPerPage)} // Calculate the number of pages
                    page={currentPage} // Current page
                    onChange={handlePageChange} // Handle page change
                    color="primary"
                    sx={{ mt: 2 }}
                />
            )}
        </Box>
    );
};

export default MyJobs;
