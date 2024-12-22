import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Avatar,
    Button,
    Card,
    CardContent,
    TextField,
    Chip,
    Snackbar,
    Alert,
} from '@mui/material';

const ProfilePage = ({ onUpdateProfilePhoto }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        location: '',
        hourlyRate: '',
        bio: '',
        jobRole: '',
        skills: [],
        profilePhoto: null,
        resume: null,
    });

    const [skillInput, setSkillInput] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [isEditing, setIsEditing] = useState(true); // Toggle between edit and view modes

    useEffect(() => {
        // Automatically populate email from localStorage or API
        const email = localStorage.getItem('email'); // Assuming email is saved during login
        if (email) {
            setProfile((prev) => ({ ...prev, email }));
        }
    }, []);

    const handleSkillAdd = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!profile.skills.includes(skillInput.trim())) {
                setProfile((prev) => ({
                    ...prev,
                    skills: [...prev.skills, skillInput.trim()],
                }));
                setSkillInput('');
            } else {
                setAlert({ open: true, message: 'Skill already added.', severity: 'warning' });
            }
        }
    };

    const handleSkillRemove = (skill) => {
        setProfile((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setProfile((prev) => ({ ...prev, [type]: file }));
        }
    };

    const validateFields = () => {
        if (
            !profile.name ||
            !profile.location ||
            !profile.hourlyRate ||
            !profile.bio ||
            !profile.jobRole ||
            profile.skills.length === 0 ||
            !profile.profilePhoto ||
            !profile.resume
        ) {
            setAlert({
                open: true,
                message: 'Please complete all required fields.',
                severity: 'error',
            });
            return false;
        }
        return true;
    };

    const handleSubmitProfile = async () => {
        if (!validateFields()) return;

        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('location', profile.location);
        formData.append('hourlyRate', profile.hourlyRate);
        formData.append('bio', profile.bio);
        formData.append('jobRole', profile.jobRole);
        formData.append('skills', JSON.stringify(profile.skills));
        formData.append('profilePhoto', profile.profilePhoto);
        formData.append('resume', profile.resume);

        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        try {
            const response = await fetch('http://localhost:3001/api/freelancers/profile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                onUpdateProfilePhoto(result.data.profilePhoto); // Update Navbar with new profile photo
                setAlert({
                    open: true,
                    message: 'Profile submitted successfully!',
                    severity: 'success',
                });
                setIsEditing(false); // Switch to view mode
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            setAlert({
                open: true,
                message: 'Error submitting profile: ' + error.message,
                severity: 'error',
            });
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#E3F2FD',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '80px',
            }}
        >
            <Container maxWidth="sm">
                {isEditing ? (
                    <>
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ fontWeight: 'bold', color: '#0D47A1', mb: 3 }}
                        >
                            Edit Profile
                        </Typography>

                        <Card sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
                            <CardContent>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Upload Profile Photo
                                    </Typography>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => handleFileChange(e, 'profilePhoto')}
                                    />
                                </Box>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    required
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Location"
                                    fullWidth
                                    required
                                    value={profile.location}
                                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Hourly Rate ($)"
                                    fullWidth
                                    required
                                    type="number"
                                    value={profile.hourlyRate}
                                    onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Bio"
                                    fullWidth
                                    required
                                    multiline
                                    rows={4}
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Job Role (e.g., Developer, Designer)"
                                    fullWidth
                                    required
                                    value={profile.jobRole}
                                    onChange={(e) => setProfile({ ...profile, jobRole: e.target.value })}
                                    sx={{ mb: 2 }}
                                />
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Skills
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {profile.skills.map((skill, index) => (
                                        <Chip
                                            key={index}
                                            label={skill}
                                            onDelete={() => handleSkillRemove(skill)}
                                            color="primary"
                                        />
                                    ))}
                                </Box>
                                <TextField
                                    label="Add a skill"
                                    fullWidth
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={handleSkillAdd}
                                    helperText="Press Enter to add a skill."
                                />
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Upload Resume (PDF)
                                    </Typography>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => handleFileChange(e, 'resume')}
                                        required
                                    />
                                </Box>
                            </CardContent>
                        </Card>

                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSubmitProfile}
                                sx={{ px: 4 }}
                            >
                                Submit Profile
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Card sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Your Profile
                                </Typography>
                                <Avatar
                                    alt="Profile Photo"
                                    src={
                                        profile.profilePhoto
                                            ? URL.createObjectURL(profile.profilePhoto)
                                            : 'https://via.placeholder.com/100'
                                    }
                                    sx={{ width: 100, height: 100, mb: 2 }}
                                />
                                <Typography>Name: {profile.name}</Typography>
                                <Typography>Email: {profile.email}</Typography>
                                <Typography>Location: {profile.location}</Typography>
                                <Typography>Hourly Rate: ${profile.hourlyRate}/hr</Typography>
                                <Typography>Bio: {profile.bio}</Typography>
                                <Typography>Job Role: {profile.jobRole}</Typography>
                                <Typography>
                                    Skills: {profile.skills.length > 0 ? profile.skills.join(', ') : 'No skills added'}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsEditing(true)}
                                sx={{ px: 4 }}
                            >
                                Update Profile
                            </Button>
                        </Box>
                    </>
                )}

                <Snackbar
                    open={alert.open}
                    autoHideDuration={4000}
                    onClose={() => setAlert({ open: false })}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default ProfilePage;