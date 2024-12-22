import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import apiClient from '../api/apiClient';
import logo from '../logo.svg';

const Navbar = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false); // State to handle drawer
    const [anchorEl, setAnchorEl] = useState(null); // State to handle profile menu
    const navigate = useNavigate(); // Use navigate for redirection
    const [userRole, setUserRole] = useState(null); // Store user role


    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const role = localStorage.getItem('role'); // Retrieve role from localStorage
                setUserRole(role);
                const response = await apiClient.get('/freelancers/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setProfilePhoto(response.data.data.profilePhoto);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfilePhoto();
    }, [localStorage.getItem("role")]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen); // Toggle drawer state
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); // Open profile menu
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close profile menu
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('role'); // Remove token from localStorage
        setUserRole(null);
        setProfilePhoto(null);

        navigate('/');
        handleMenuClose();
    };

    const drawer = (
        <List>
            <ListItem button onClick={() => { navigate('/landing'); setMobileOpen(false); }}>
                <ListItemText primary="Home" />
            </ListItem>
            {/* <ListItem button onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}>
                <ListItemText primary="Opportunities" />
            </ListItem> */}
            {(userRole === "employer" || userRole === "admin") && (
                <ListItem button onClick={() => { navigate('/jobs/create'); setMobileOpen(false); }}>
                    <ListItemText primary="Post Jobs" />
                </ListItem>)}
            {(userRole === "employer" || userRole === "admin") && (
                <ListItem button onClick={() => { navigate('/jobs/current'); setMobileOpen(false); }}>
                    <ListItemText primary="My Jobs" />
                </ListItem>)}
            {(userRole === "employer" || userRole === "admin") && (
                <ListItem button onClick={() => { navigate('/freelancers'); setMobileOpen(false); }}>
                    {/* link /freelancers path to get the freelancers */}
                    <ListItemText primary="Explore Talents" />
                </ListItem>
            )}
            {(userRole === "freelancer" || userRole === "admin") && (
                <ListItem button onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}>
                    {/* link /opportunities path to get the jobs */}
                    <ListItemText primary="Job Opportunities" />
                </ListItem>
            )}
            {(userRole === "freelancer" || userRole === "admin") && (

                <ListItem button onClick={() => { navigate('/profile'); setMobileOpen(false); }}>
                    <ListItemText primary="Profile" />
                </ListItem>
            )}
            <ListItem button onClick={() => { navigate('/'); setMobileOpen(false); }}>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    );

    return (
        <>
            <AppBar
                position="relative"
                sx={{
                    backgroundColor: 'black', // Slightly more transparent
                    backdropFilter: 'blur(12px)', // Enhance blur effect
                    boxShadow: 'none', // Remove default shadow
                    zIndex: 10, // Ensure navbar stays above other content
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box
                        component="img"
                        src={logo}
                        alt="Logo"
                        sx={{
                            height: 40,
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)', // Hover effect
                            },
                        }}
                        onClick={() => navigate('/')} // Click redirects to home
                    />

                    {/* Desktop Navigation Links */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {userRole !== null && (<Button
                            color="inherit"
                            onClick={() => navigate('/landing')}
                            sx={{
                                color: 'white', // Text color for visibility on transparent navbar
                                fontWeight: 'bold',
                                mx: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Home
                        </Button>)}
                        {(userRole === 'admin' || userRole === 'employer') && (
                            <Button
                                color="inherit"
                                onClick={() => navigate('/freelancers')}
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Explore Talents
                            </Button>
                        )}
                        {(userRole === 'admin' || userRole === 'freelancer') && (
                            <Button color="inherit" onClick={() => navigate('/dashboard')}
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}>
                                Opportunities
                            </Button>
                        )}
                        {(userRole === 'admin' || userRole === 'employer') && (

                            (<Button
                                color="inherit"
                                onClick={() => navigate('/jobs/create')}
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                Post Jobs
                            </Button>))}

                        {(userRole === 'employer') &&
                            (<Button
                                color="inherit"
                                onClick={() => navigate('/jobs/current')}
                                sx={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                My Jobs
                            </Button>)
                        }
                        {(userRole === 'admin' || userRole === 'freelancer') && (
                            <Button
                                color="inherit"
                                onClick={() => navigate('/profile')}
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Profile
                            </Button>)}
                        {(userRole === null) && <Button
                            color="inherit"
                            onClick={() => navigate('/signup')}
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                mx: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Sign up
                        </Button>}
                        {(userRole === null) && <Button
                            color="inherit"
                            onClick={() => navigate('/login')}
                            sx={{
                                color: 'white', // Text color
                                padding: '10px 20px', // Padding for the button
                                borderRadius: '5px', // Border radius to make the corners rounded
                                border: '1px solid white', // Border color and style
                                cursor: 'pointer', // Cursor changes to pointer on hover
                                backgroundColor: '#0062ff', // Background color
                                fontWeight: 'bold', // Bold text

                                '&:hover': {
                                    backgroundColor: '#327bf1', // Background color when hovered
                                },
                            }}
                        >
                            Login
                        </Button>}
                        {(userRole !== null) && (
                            <>
                                <IconButton
                                    onClick={handleMenuOpen}
                                    sx={{
                                        ml: 2,
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                >
                                    {/* Static Avatar with letter "F" */}
                                    <Avatar
                                        alt="Profile Icon"
                                        sx={{
                                            ml: 0,
                                            bgcolor: '#3f51b5', // Add a background color for the icon
                                            color: '#fff', // White text color for contrast
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.3)',
                                            },
                                        }}
                                    >
                                        A
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu></>)}
                    </Box>

                    {/* Hamburger Menu for Mobile */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        aria-label="menu"
                        sx={{ display: { xs: 'block', md: 'none' }, color: '#fff' }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile Navigation */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;