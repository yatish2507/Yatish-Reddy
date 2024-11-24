import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PieChart, Pie, Tooltip as PieTooltip, Legend as PieLegend, Cell } from 'recharts';
import { fetchUsers, fetchProjects, fetchDonations, fetchSafetyReports, fetchVolunteers } from '../services/adminDashboard-service';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Donation } from '../models/Donation';
import { SafetyReport } from '../models/SafetyReport';
import { VolunteerSignUp } from '../models/VolunteerSignUp';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

const AdminDashboard: React.FC = () => {
    const [reportData, setReportData] = useState<{ monthYear: string; reportsCount: number }[]>([]);
    const [userCount, setUserCount] = useState<number>(0);
    const [projectCount, setProjectCount] = useState<number>(0);
    const [totalDonations, setTotalDonations] = useState<number>(0);
    const [volunteersData, setVolunteersData] = useState<{ title: string; volunteersCount: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users count
                const users: User[] = await fetchUsers();
                setUserCount(users.length);

                // Fetch projects count
                const projects: Project[] = await fetchProjects();
                setProjectCount(projects.length);

                // Fetch total donations
                const donations: Donation[] = await fetchDonations();
                const totalAmount = donations.reduce((acc: number, donation: Donation) => acc + parseFloat(donation.amount), 0);
                setTotalDonations(totalAmount);

                // Fetch safety reports
                const reports: SafetyReport[] = await fetchSafetyReports();
                // Group reports by month
                const groupedData: { [key: string]: number } = {};
                reports.forEach((report: SafetyReport) => {
                    const monthYear = new Date(report.reportDate as Date).toLocaleString('default', { month: 'long', year: 'numeric' });
                    if (groupedData[monthYear]) {
                        groupedData[monthYear]++;
                    } else {
                        groupedData[monthYear] = 1;
                    }
                });
                // Convert grouped data to an array of objects
                const data = Object.keys(groupedData).map((key) => ({
                    monthYear: key,
                    reportsCount: groupedData[key],
                }));
                setReportData(data);

                // Fetch volunteers data
                const volunteers: VolunteerSignUp[] = await fetchVolunteers();
                const projectCounts: { [projectId: string]: number } = {};
                volunteers.forEach((VolunteerSignUp) => {
                    if (projectCounts[VolunteerSignUp.projectId]) {
                        projectCounts[VolunteerSignUp.projectId]++;
                    } else {
                        projectCounts[VolunteerSignUp.projectId] = 1;
                    }
                });

                const chartData = projects.map((project) => {
                    const volunteersCount = projectCounts[project.id] || 0;
                    return {
                        title: project.title,
                        volunteersCount,
                    };
                });

                setVolunteersData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return (
        <div>

            <Grid container spacing={2}>
                {/* Grid item for Total Users */}
                <Grid item xs={12} sm={6} lg={4}>
                    <Card
                        raised style={{
                            overflow: 'hidden',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            backgroundImage: 'linear-gradient(145deg, #e6f7ff, #ffebf5)',
                            borderRadius: '15px',
                        }}>
                        <CardContent style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '20px',
                            borderRadius: '15px',
                            background: 'rgba(255, 255, 255, 0.8)', 
                            backdropFilter: 'blur(5px)' 
                        }}>
                            <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
                                <AccountCircleRoundedIcon style={{ fontSize: '50px', color: 'orange' }} />
                                <Typography variant="h5" component="h2" style={{ fontSize: '18px', color: '#3f51b5', marginLeft: '10px' }}>
                                    Users
                                </Typography>
                            </div>
                            <Typography variant="h4" component="p" style={{ color: 'orange', fontWeight: 'bold', fontSize: '30px' }}>
                                {userCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>


                {/* Grid item for Total Projects */}
                <Grid item xs={12} sm={6} lg={4}>
                    <Card raised style={{
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        backgroundImage: 'linear-gradient(145deg, #e6f7ff, #ffebf5)',
                        borderRadius: '15px',
                    }}>
                        <CardContent style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '20px',
                            borderRadius: '15px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(5px)' 
                        }}>
                            <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
                                <WorkRoundedIcon style={{ fontSize: '50px', color: 'red' }} />
                                <Typography variant="h5" component="h2" style={{ fontSize: '18px', color: '#3f51b5', marginLeft: '10px' }}>
                                    Total Projects
                                </Typography>
                            </div>
                            <Typography variant="h4" component="p" style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>
                                {projectCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Grid item for Total Donations */}
                <Grid item xs={12} sm={6} lg={4}>
                    <Card raised style={{
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        backgroundImage: 'linear-gradient(145deg, #e6f7ff, #ffebf5)',
                        borderRadius: '15px',
                    }}>
                        <CardContent style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '20px',
                            borderRadius: '15px',
                            background: 'rgba(255, 255, 255, 0.8)', 
                            backdropFilter: 'blur(5px)' 
                        }}>
                            <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
                                <MonetizationOnRoundedIcon style={{ fontSize: '50px', color: 'green' }} />
                                <Typography variant="h5" component="h2" style={{ fontSize: '18px', color: '#3f51b5', marginLeft: '10px' }}>
                                    Total Donations
                                </Typography>
                            </div>
                            <Typography variant="h4" component="p" style={{ color: 'green', fontWeight: 'bold', fontSize: '30px' }}>
                                ${totalDonations.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


            <br />
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                <Grid item xs={12} md={10} lg={8}>
                    <Card raised style={{
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        backgroundImage: 'linear-gradient(145deg, #e6f7ff, #ffebf5)',
                        borderRadius: '15px',
                    }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" align="center" gutterBottom style={{ marginTop: '20px' }}>
                                Safety Reports by Month
                            </Typography>
                            <div style={{ padding: '20px', borderRadius: '15px' }}>
                                <LineChart
                                    width={730}
                                    height={300} 
                                    data={reportData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="monthYear" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line
                                        type="monotone"
                                        dataKey="reportsCount"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                        isAnimationActive={true}
                                        animationDuration={2000}
                                    />
                                </LineChart>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br />
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                <Grid item xs={12} md={10} lg={8}>
                    <Card raised style={{
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        backgroundImage: 'linear-gradient(145deg, #e6f7ff, #ffebf5)',
                        borderRadius: '15px',
                    }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" align="center" gutterBottom style={{ marginTop: '20px' }}>
                                Volunteers by Project
                            </Typography>
                            <div style={{ padding: '20px', borderRadius: '15px' }}>
                                <PieChart width={730} height={300}>
                                    <Pie
                                        data={volunteersData}
                                        dataKey="volunteersCount"
                                        nameKey="title"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label={(entry) => `${entry.volunteersCount}`}
                                    >
                                        {volunteersData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <PieTooltip />
                                    <PieLegend />
                                </PieChart>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
};

export default AdminDashboard;
