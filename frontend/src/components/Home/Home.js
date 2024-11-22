import React, { useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

export default function Home() {
    const { theme } = useTheme();
    const { user } = useUser();

    useEffect(() => {
        document.title = "Home - FleetRewards";
    }, []);

    if (user) {
        return (
            <Container className={`home ${theme}`} maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: theme === "dark" ? "#333" : "#fff", width: '100%' }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to your Dashboard
                    </Typography>
                    <Typography variant="body1">
                        Welcome back <b>{user.username}</b>, to the FleetRewards portal!
                    </Typography>
                </Box>

                <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: theme === "dark" ? "#333" : "#fff", width: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Check out the available forms
                    </Typography>
                    <Button component={Link} to="/surveys" variant="contained" color="primary">
                        Available Forms
                    </Button>
                </Box>

                <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: theme === "dark" ? "#333" : "#fff", width: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Feedback Form
                    </Typography>
                    <Button component={Link} to="/feedback" variant="contained" color="secondary">
                        Feedback Form
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container className={`home ${theme}`} maxWidth="md" >
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: theme === "dark" ? "#333" : "#fff", width: '100%' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to FleetRewards
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Earn points by completing surveys, polls, and feedback forms. Use your points to redeem rewards!
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Sign up now!
                </Typography>
                <Button component={Link} to="/register" variant="contained" color="primary" sx={{ mr: 2 }}>
                    Register
                </Button>
                <Button component={Link} to="/login" variant="contained" color="primary">
                    Login Instead!
                </Button>
            </Box>
        </Container>
    );
}