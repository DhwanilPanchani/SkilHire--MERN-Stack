import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.data.token); // Save token
                localStorage.setItem('role', data.data.role);  // Save role
                localStorage.setItem('name', data.data.name);  // Save name

                setAlert({ open: true, message: 'Login successful!', severity: 'success' });

                if (data.data.role === 'freelancer') {
                    navigate('/landing');
                } else {
                    navigate('/dashboard');
                }
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setAlert({ open: true, message: error.message, severity: 'error' });
        }
    };

    return (
        <Box
            sx={{
                height: '100vh', // Full viewport height
                backgroundImage: 'url("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                backgroundSize: 'cover', // Ensure image covers entire screen
                backgroundPosition: 'center', // Center the image
                display: 'flex',
                justifyContent: 'center', // Center the content horizontally
                alignItems: 'center', // Center the content vertically
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: 3,
                    padding: 3,
                    opacity: 0.9, // Optional: Slight transparency to form background to show image
                }}
            >
                <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mb: 2, backgroundColor: '#1dbf73', '&:hover': { backgroundColor: '#17a55e' } }}>
                    Log In
                </Button>
                <Typography align="center" sx={{ mt: 1, fontSize: '14px', color: '#555' }}>
                    Don't have an account?{' '}
                    <Button
                        variant="text"
                        onClick={() => navigate('/signup')}
                        sx={{ fontWeight: 600, color: '#1dbf73' }}
                    >
                        Sign Up
                    </Button>
                </Typography>
            </Container>

            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, open: false })}
            >
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
