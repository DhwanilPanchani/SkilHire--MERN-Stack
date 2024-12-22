
// export default FreelancerList;

import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { Grid, Card, CardContent, Typography, Avatar, TextField, Box, Button, Stack } from '@mui/material';
 
const FreelancerList = () => {
    const [freelancers, setFreelancers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFreelancers, setFilteredFreelancers] = useState([]);
    const [filterType, setFilterType] = useState('all'); // Determines which filter is active
 
    useEffect(() => {
        const fetchFreelancers = async () => {
            try {
                const response = await apiClient.get('/freelancer');
                setFreelancers(response.data.data);
                setFilteredFreelancers(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFreelancers();
    }, []);
 
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
 
        const filtered = freelancers.filter((freelancer) => {
            switch (filterType) {
                case 'name':
                    return freelancer.name.toLowerCase().includes(lowerCaseQuery);
                case 'bio':
                    return freelancer.bio.toLowerCase().includes(lowerCaseQuery);
                case 'location':
                    return freelancer.location.toLowerCase().includes(lowerCaseQuery);
                case 'hourlyRate':
                    return freelancer.hourlyRate.toString().includes(lowerCaseQuery);
                case 'skills':
                    return freelancer.skills.some((skill) => skill.toLowerCase().includes(lowerCaseQuery));
                default: // 'all'
                    return (
                        freelancer.name.toLowerCase().includes(lowerCaseQuery) ||
                        freelancer.bio.toLowerCase().includes(lowerCaseQuery) ||
                        freelancer.location.toLowerCase().includes(lowerCaseQuery) ||
                        freelancer.skills.some((skill) => skill.toLowerCase().includes(lowerCaseQuery)) ||
                        freelancer.hourlyRate.toString().includes(lowerCaseQuery)
                    );
            }
        });
 
        setFilteredFreelancers(filtered);
    }, [searchQuery, freelancers, filterType]);
 
    return (
<Box sx={{ mt: 3, px: 2 }}>
            {/* Search Bar and Filter Buttons */}
<Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }} style={{marginTop:"80px"}}>
<TextField
                    label="Search Freelancers"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{width:"440px"}}

                />
                <span>Filter By </span>
<Button
                    variant={filterType === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('all')}
>
                    All
</Button>
<Button
                    variant={filterType === 'location' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('location')}
>
                    Location
</Button>
<Button
                    variant={filterType === 'hourlyRate' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('hourlyRate')}
>
                    Hourly Rate
</Button>
<Button
                    variant={filterType === 'skills' ? 'contained' : 'outlined'}
                    onClick={() => setFilterType('skills')}
>
                    Skills
</Button>
</Stack>
 
            {/* Freelancer Cards */}
<Grid container spacing={3}>
                {filteredFreelancers.map((freelancer) => (
<Grid item xs={12} sm={6} md={4} key={freelancer._id}>
<Card>
<CardContent>
<Avatar
                                    src={freelancer.profilePhoto}
                                    alt={freelancer.name}
                                    sx={{ width: 56, height: 56, mb: 2 }}
                                />
<Typography variant="h6">{freelancer.name}</Typography>
<Typography variant="body2" color="text.secondary">
                                    {freelancer.bio}
</Typography>
<Typography variant="subtitle2">
                                    Location: {freelancer.location}
</Typography>
<Typography variant="subtitle2">
                                    Hourly Rate: ${freelancer.hourlyRate}
</Typography>
<Typography variant="subtitle2">
                                    Skills: {freelancer.skills.join(', ')}
</Typography>
</CardContent>
</Card>
</Grid>
                ))}
</Grid>
</Box>
    );
};
 
export default FreelancerList;

