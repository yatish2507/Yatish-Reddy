import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, Snackbar, Alert, CircularProgress, Dialog, DialogContent, DialogContentText } from '@mui/material';
import reportBackground from '../assets/reportbg.jpeg';
import { submitSafetyReport } from '../services/safetyReport'; // Adjust the path as necessary
import { SafetyReport } from '../models/SafetyReport';
import { useNavigate } from 'react-router-dom';

const SafetyReportPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setLoading(true); // Start loading
        const formData = new FormData(event.currentTarget);
        const data: SafetyReport = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            address: formData.get('address') as string,
            state: formData.get('state') as string,
            city: formData.get('city') as string,

        };

        try {
            await submitSafetyReport(data);
            setMessage('Report submitted successfully!');
            setSeverity('success');

            navigate('/');
            setLoading(false); // Stop loading
            setOpenSnackbar(true);
            setTimeout(() => window.location.reload(), 1000); // Reload the page after 1 seconds
        } catch (error) {
            console.error('Submission failed:', error);
            setMessage('Failed to submit report. Please try again.');
            setSeverity('error');
            setLoading(false); // Stop loading
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    return (
        <Grid container sx={{
            height: '100vh', // Full viewport height
            width: '100vw', // Full viewport width
            overflow: 'hidden', // Prevents scrolling
            position: 'fixed', // Ensures the grid does not move on scroll
            top: 0,
            left: 0,
            alignItems: 'center', // Align items vertically in the center
            justifyContent: 'flex-start', // Align items horizontally to the left
            background: `url(${reportBackground}) no-repeat center center fixed`,
            backgroundSize: 'cover',
        }}>
            <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{
                    color: '#fff', // White text color
                    mt: -8, // Adjust margin top to align it properly
                    width: '100%',
                    textAlign: 'center',
                    p: 1,
                    // Semi-transparent background for better visibility
                }}>
                    SAFETY REPORT
                    <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        Ensure all details are correct before submission. Your report is crucial for timely and effective response.
                    </Typography>
                </Typography>
                <Paper elevation={6} sx={{
                    width: '100%',
                    maxWidth: 500,
                    p: 4,
                    m: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
                    color: '#fff', // White text color
                    overflow: 'hidden' // Prevents internal content from causing scroll
                }}>
                    <form onSubmit={handleSubmit} style={{ color: '#574849' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            InputLabelProps={{
                                style: { color: '#fff' }
                            }}
                            InputProps={{
                                style: { color: '#fff' }
                            }}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            InputLabelProps={{
                                style: { color: '#fff' }
                            }}
                            InputProps={{
                                style: { color: '#fff' }
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            InputLabelProps={{
                                style: { color: '#fff' }
                            }}
                            InputProps={{
                                style: { color: '#fff' }
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="state"
                                label="State"
                                name="state"
                                sx={{ mr: 1, flex: 1 }}
                                InputLabelProps={{
                                    style: { color: '#fff' }
                                }}
                                InputProps={{
                                    style: { color: '#fff' }
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="city"
                                label="City"
                                name="city"
                                sx={{ flex: 1 }}
                                InputLabelProps={{
                                    style: { color: '#fff' }
                                }}
                                InputProps={{
                                    style: { color: '#fff' }
                                }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"

                            sx={{ mt: 3, mb: 2, backgroundColor: '#574849' }}
                        >
                            Submit Report
                        </Button>
                    </form>
                </Paper>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <Dialog open={loading} PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}>
                    <DialogContent>
                        <CircularProgress color="inherit" />
                        <DialogContentText sx={{ color: '#fff', mt: 2, textAlign: 'center' }}>
                            Submitting your report...
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Grid>
        </Grid>
    );
};

export default SafetyReportPage;
