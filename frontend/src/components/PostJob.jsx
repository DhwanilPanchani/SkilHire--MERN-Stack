import React, { useState } from 'react';
import { TextField, Button, Box, Card, CardContent, Typography } from '@mui/material';
import apiClient from '../api/apiClient';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        hourlyRate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            await apiClient.post('/jobs/create', formData,{ headers: {
                Authorization: `Bearer ${token}`, // Attach token as a Bearer token
            }}
            ,);
            alert('Job posted successfully!');
            setFormData({ title: '', description: '', location: '', hourlyRate: '' });
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job.');
        }
    };

    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Centers the card vertically and horizontally
            backgroundColor: '#f4f6f8', // Light background for better contrast
            padding: 2,
        }}
    >

        <Card
          sx={{
            width: 400, // Set the width of the card
            boxShadow: 3, // MUI shadow level (0-24, higher is darker)
            borderRadius: 2, // Slightly rounded corners
          }}
        >
          <CardContent>
          <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                        Post a Job
                    </Typography>
                    <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 10, display: "flex", flexDirection: "column", gap: 2 }}
      >
            <TextField
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextField
              label="Hourly Rate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              type="number"
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Post Job  
            </Button>
            </Box>

          </CardContent>
        </Card>
      </Box>
    );
};

export default PostJob;
