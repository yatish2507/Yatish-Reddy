import React from 'react';
import UserProfile from './UserProfile';
import Volunteered from './Volunteered';
import Donations from './Donation-dashboard';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, AppBar } from '@mui/material';
import { AppState } from '../store';
import { User } from '../models/User';
import { logout } from '../store/login-form-slice';
import { useNavigate } from 'react-router-dom';



const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const user: User = useSelector((state: AppState) => state.login.user as User);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getContent = () => {
        switch (activeTab) {
            case 'volunteered':
                return <Volunteered userId={user ? user.id as string : 'defaultId'} />;
            case 'donations':
                return <Donations />;
                break;
            default:
                return <UserProfile user={user} />;
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <div style={{ display: 'flex' }}> {/* Start content under the header */}
                <AppBar position="static" style={{ backgroundColor: '#574849', flexDirection: 'row', width: '150px', height: '100vh', justifyContent: 'flex-start' }}>
                    <div style={{ paddingTop: '10px' }}>
                        <List sx={{ color: 'white' }}  >
                            <ListItem button onClick={() => setActiveTab('profile')} >
                                <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary="User Profile" />
                            </ListItem>
                            <ListItem button onClick={() => setActiveTab('volunteered')}>
                                <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary="Volunteered" />
                            </ListItem>
                            <ListItem button onClick={() => setActiveTab('donations')}>
                                <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary="Donations" />
                            </ListItem>
                        </List>
                        <ListItem button onClick={handleLogout} style={{ marginTop: 'auto' }}>
                            <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary="Logout" />
                        </ListItem>
                    </div>
                </AppBar>
                <main style={{ flexGrow: 1, padding: '20px' }}>
                    {getContent()}
                </main>
            </div>
        </>
    );
}

export default Dashboard;