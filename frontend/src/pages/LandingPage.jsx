import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';

const LandingPage = () => {
    const images = [
        {
            src: 'https://plus.unsplash.com/premium_photo-1674489620667-eaf4a0094996?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Empowering Freelancers',
            description: 'Join a platform that supports your growth.',
        },
        {
            src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Collaboration Opportunities',
            description: 'Work with teams from around the globe.',
        },
        {
            src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            title: 'Work Remotely',
            description: 'Experience the freedom of remote work.',
        },
        {
            src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            title: 'Creative Projects',
            description: 'Find exciting projects to showcase your skills.',
        },
        {
            src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            title: 'Tech Innovators',
            description: 'Collaborate with innovators in technology.',
        },
        {
            src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            title: 'Achieve Your Goals',
            description: 'Take the next step in your career with us.',
        },
    ];

    const [currentBackground, setCurrentBackground] = useState(0);
    const [userName, setUserName] = useState('');

    // Fetch the username from localStorage
    useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setUserName(name); // Set the username if available in localStorage
        }
    }, []);

    // Change background every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackground((prev) => (prev + 1) % images.length);
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                backgroundImage: `url(${images[currentBackground].src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in-out',
                margin: 0,
                padding: 0,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for better readability
                }}
            />
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    paddingTop: '80px', // Add padding equal to navbar height
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#fff',
                        mb: 4,
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
                    }}
                >
                    {userName ? `Welcome ${userName}!` : 'Welcome Freelancer!'}
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{
                        color: '#ccc',
                        mb: 5,
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
                    }}
                >
                    Explore opportunities, connect with clients, and build your future.
                </Typography>
                <Grid container spacing={4}>
                    {images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={image.src}
                                    alt={image.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'opacity 0.3s ease-in-out',
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        opacity: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        transition: 'opacity 0.3s ease-in-out',
                                        '&:hover': {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom>
                                        {image.title}
                                    </Typography>
                                    <Typography variant="body2">{image.description}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default LandingPage;
