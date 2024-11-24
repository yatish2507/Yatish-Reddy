import React, { useState } from 'react';
import { Person as PersonIcon, Folder as ProjectsIcon, Home as HomeIcon, Report as SafetyReportsIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import Users from '../pages/adminDashboard-Users'; // Adjust this import path as necessary
import Projects from '../pages/adminDashboard-Projects';
import SafetyReports from '../pages/adminDashboard-Reports';
import Home from '../pages/adminDashboard-Home';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/login-form-slice';

const drawerWidth = 240;

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const handleListItemClick = (text: string) => {
        setActiveTab(text);
    };

    // Setup dispatch for Redux actions and navigate for routing.
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handler for logout action.
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    // Function to render content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'Users':
                return <Users />;
            case 'Projects':
                return <Projects />;
            case 'Home':
                return <Home />;
            case 'Safety Reports':
                return <SafetyReports />;
            default:
                return <Typography variant="h6">Select a category</Typography>;
        }
    };

    // Function to return the appropriate icon for each tab.
    const getIcon = (text: string) => {
        switch (text) {
            case 'Users':
                return <PersonIcon />;
            case 'Projects':
                return <ProjectsIcon />;
            case 'Home':
                return <HomeIcon />;
            case 'Safety Reports':
                return <SafetyReportsIcon />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {/* Drawer header */}
                <Box sx={{ px: 2, py: 2, backgroundColor: 'grey', color: 'whitesmoke' }}>
                    <Typography variant="h5" noWrap>
                        Admin Dashboard
                    </Typography>
                </Box>
                <Divider />
                {/* List of navigation items */}
                <List>
                    {['Home', 'Users', 'Projects', 'Safety Reports'].map((text) => (
                        <ListItem button key={text} onClick={() => handleListItemClick(text)} sx={{ py: 2 }}>
                            <ListItemIcon>{getIcon(text)}</ListItemIcon>
                            <ListItemText primary={text} primaryTypographyProps={{ variant: 'h6' }} />
                        </ListItem>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    {/* Logout option */}
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '20px' }} />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default Dashboard;
