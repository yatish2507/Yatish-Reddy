import React, { useEffect } from 'react';
import { Avatar, Button, Grid, TextField, Typography, Stack } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import { User } from '../models/User';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../store';
import { saveUser, setUser, toggleEditMode, updateField } from '../store/user-profile-slice';

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const { formData, isEditMode, isLoading, error } = useSelector((state: AppState) => state.userProfile);

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }
    }, [user, dispatch]);

    const handleSaveChanges = () => {
        dispatch(saveUser({ userId: user.id as string, fullname: formData.fullname, email: formData.email }));
    };

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Stack spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <Stack spacing={2} alignItems="center">
                    <Avatar sx={{ width: 100, height: 100, fontSize: '50px', backgroundColor: '#574849' }}>{formData.fullname?.charAt(0)}</Avatar>
                </Stack>
            </Grid>

            {/* <Avatar sx={{ width: 56, height: 56 }}>{formData.fullname?.charAt(0)}</Avatar> */}
            <Typography variant="h6">{formData.fullname}</Typography>
            {/* <Typography variant="body1">{formData.fullname}</Typography> */}
            <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ color: '#574849', borderColor: '#574849' }}
                onClick={() => dispatch(toggleEditMode())}
            >
                Edit Profile
            </Button>
            {isEditMode && (
                <Stack spacing={1} alignItems="center" width="100%">
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        sx={{ width: '400px' }}
                        value={formData.fullname || ''}
                        onChange={(e) => dispatch(updateField({ field: 'fullname', value: e.target.value }))}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        sx={{ width: '400px' }}
                        value={formData.email || ''}
                        onChange={(e) => dispatch(updateField({ field: 'email', value: e.target.value }))}
                    />
                    {/* Add more fields for editing as necessary */}
                    <Button
                        variant="contained"
                        onClick={handleSaveChanges}
                        sx={{ backgroundColor: '#574849' }}
                    >
                        Save Changes
                    </Button>
                </Stack>
            )}
        </Stack>
    );
};

export default UserProfile;
