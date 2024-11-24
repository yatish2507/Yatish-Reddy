import React, { useState, useEffect } from 'react';
import { fetchDonations } from '../services/donation-service'; // Adjust the import path as necessary
import { Donation } from '../models/Donation';
import { Card, Table, TableBody, TableCell, TableRow, Typography, Box, IconButton, CircularProgress, Alert } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import EventNoteIcon from '@mui/icons-material/EventNote'; // Calendar icon
import BarChartIcon from '@mui/icons-material/BarChart'; // Graph icon
import { AppState } from '../store';
import { useSelector } from 'react-redux';
import { User } from '../models/User';
// import { useSelector } from 'react-redux';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import TodayIcon from '@mui/icons-material/Today';

const DonationDashboard: React.FC = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const user: User = useSelector((state: AppState) => state.login.user as User);

    useEffect(() => {
        // Assume 'userId' is hardcoded or comes from some user context
        // const userId = "9876"; // Replace with actual user ID context or prop
        fetchDonations(user.id as string)
            .then(data => {
                setDonations(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []); // Dependency array is empty, so this runs only once after the component mounts
    // Calculate giving stats
    const totalDonations = donations.reduce((acc, donation) => acc + parseFloat(donation.amount), 0);
    const averageDonation = donations.length > 0 ? totalDonations / donations.length : 0;

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Error: {error}
            </Alert>
        );
    }

    return (
        <div>
            {/* Giving stats cards */}
            <Box display="flex" alignItems="center" marginBottom="20px">
                <IconButton edge="start" color="inherit" aria-label="graph">
                    <BarChartIcon />
                </IconButton>
                <Typography variant="h6" style={{ marginLeft: '10px' }}>Giving Stats</Typography>
            </Box>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <Box style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <Card variant="outlined" style={{ width: '200px', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                        <Typography variant="h3" style={{ color: '#7fc68c' }}>{donations.length}</Typography>
                        <Typography color="textSecondary">Number of Donations</Typography>
                    </Card>
                    <Card variant="outlined" style={{ width: '200px', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                        <Typography variant="h3" style={{ color: '#7fc68c' }}>${totalDonations.toFixed(2)}</Typography>
                        <Typography color="textSecondary">Lifetime Donations</Typography>
                    </Card>
                    <Card variant="outlined" style={{ width: '200px', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                        <Typography variant="h3" style={{ color: '#7fc68c' }}>${averageDonation.toFixed(2)}</Typography>
                        <Typography color="textSecondary">Average Donation</Typography>
                    </Card>
                </Box>
            </div>

            {/* Recent donations list */}
            <Box display="flex" alignItems="center" marginBottom="20px">
                <IconButton edge="start" color="inherit" aria-label="calendar">
                    <EventNoteIcon />
                </IconButton>
                <Typography variant="h6" style={{ marginLeft: '10px' }}>Recent Donations</Typography>
            </Box>
            <div>
                <Card variant="outlined">
                    <Table>
                        <TableBody>
                            {/* Heading row with grey background */}
                            <TableRow style={{ backgroundColor: '#fafafa', fontSize: 'xx-large' }}>
                                <TableCell><Typography style={{ fontSize: 'larger', fontWeight: 'bold', color: 'black' }} color="textSecondary">Donation</Typography></TableCell>
                                <TableCell><Typography style={{ fontSize: 'larger', fontWeight: 'bold', color: 'black' }} color="textSecondary">Form</Typography></TableCell>
                                <TableCell><Typography style={{ fontSize: 'larger', fontWeight: 'bold', color: 'black' }} color="textSecondary">Date</Typography></TableCell>
                                <TableCell><Typography style={{ fontSize: 'larger', fontWeight: 'bold', color: 'black' }} color="textSecondary">Status</Typography></TableCell>
                            </TableRow>
                            {/* Rows for values from each donation */}
                            {donations.map((donation) => (
                                <TableRow key={donation.id} >
                                    <TableCell>
                                        <Typography>${parseFloat(donation.amount).toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Donation Form</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{new Date(donation.donationDate as Date).toLocaleString()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>

                                            <CircleIcon style={{ fontSize: '0.75rem', color: 'green', verticalAlign: 'middle' }} />
                                            {' '}
                                            Completed

                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Add View Receipt link or button here */}
                </Card>

            </div>
        </div>
    );
}

export default DonationDashboard;
