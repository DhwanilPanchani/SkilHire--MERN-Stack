import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [userRole, setUserRole] =useState(null);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await apiClient.get('/jobs');
                setUserRole(localStorage.getItem("role"));
                setJobs(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobs();
    }, []);

    const handleEditOpen = (job) => {
        setCurrentJob(job);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setCurrentJob(null);
    };

    const handleEditSubmit = async () => {
        try {
            await apiClient.put(`/jobs/${currentJob._id}`, currentJob);
            setJobs((prevJobs) =>
                prevJobs.map((job) => (job._id === currentJob._id ? currentJob : job))
            );
            handleEditClose();

        } catch (error) {
            console.error('Error updating job:', error);
        }
    };
    const handleApply = (job) => {
            if (job?.employer?.email) {
                const subject = encodeURIComponent(`Application for ${job.title}`);
                const body = encodeURIComponent(`
                    Dear ${job.employer.name},\n\nI am interested in the "${job.title}" position you posted. Please let me know how I can proceed further.\n\nThank you!\n\nBest regards,\n[Your Name]
                `);
                window.location.href = `mailto:${job.employer.email}?subject=${subject}&body=${body}`;
            } else {
                alert('Employer email not available.');
            }
        };

    const handleDelete = async (jobId) => {
        try {
            await apiClient.delete(`/jobs/${jobId}`);
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box
            sx={{
                backgroundColor: '#E3F2FD',
                minHeight: '100vh',
                paddingTop: '80px',
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#0D47A1' }}>
                    Explore Opportunities
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        label="Search Jobs"
                        fullWidth
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Box>
                <Grid container spacing={4}>
                    {filteredJobs.map((job) => (
                        <Grid item xs={12} sm={6} md={4} key={job._id}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {job.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {job.description}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                                        Location: {job.location}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Hourly Rate: ${job.hourlyRate}
                                    </Typography>
                                    {
                                        userRole === "freelancer" &&(
                                            <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            onClick={() => handleApply(job)}
                                        >
                                            Contact Employer
                                        </Button>      
                                        )
                                    }
                                    {
                                        userRole === "admin" &&(
                                            <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            onClick={() => handleEditOpen(job)}
                                        >
                                            Edit
                                        </Button>        
                                        )
                                    }

                      
                      {
                                        userRole === "admin" &&(
                                            <Button
                                            variant="contained"
                                            color="error"
                                            fullWidth
                                            sx={{ mt: 1 }}
                                            onClick={() => handleDelete(job._id)}
                                        >
                                            Delete
                                        </Button>        
                                        )
                                    }
 
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {currentJob && (
                <Dialog open={editDialogOpen} onClose={handleEditClose}>
                    <DialogTitle>Edit Job</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Title"
                            fullWidth
                            value={currentJob.title}
                            onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            fullWidth
                            value={currentJob.description}
                            onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Location"
                            fullWidth
                            value={currentJob.location}
                            onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Hourly Rate"
                            fullWidth
                            type="number"
                            value={currentJob.hourlyRate}
                            onChange={(e) => setCurrentJob({ ...currentJob, hourlyRate: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleEditSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default Dashboard;
