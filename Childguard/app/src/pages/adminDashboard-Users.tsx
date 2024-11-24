// src/pages/Users.tsx
import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../services/adminDashboard-service';
import { Card, CardContent, CardActions, Button, TextField, Snackbar, Grid, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

interface User {
    id: string;  // Assuming you will use ID for operations but not display it
    fullname: string;
    email: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editUserID, setEditUserID] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<{ fullname: string; email: string }>({ fullname: '', email: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const initFetch = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        initFetch();
    }, []);

    const handleEditClick = (user: User) => {
        setEditUserID(user.id);
        setEditFormData({ fullname: user.fullname, email: user.email });
    };

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditFormSave = async () => {
        if (editUserID) {
            try {
                await updateUser(editUserID, {
                    fullname: editFormData.fullname,
                    email: editFormData.email
                });
                setOpenSnackbar(true); // Open the Snackbar to show success message
                const updatedUsers = users.map(user => user.id === editUserID ? { ...user, ...editFormData } : user);
                setUsers(updatedUsers);
                setEditUserID(null); // Exit edit mode
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id)); // Update UI
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Grid container spacing={2}>
                {users.map(user => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card raised>
                            <CardContent>
                                {editUserID === user.id ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            name="fullname"
                                            label="Full Name"
                                            value={editFormData.fullname}
                                            onChange={handleEditFormChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            name="email"
                                            label="Email"
                                            value={editFormData.email}
                                            onChange={handleEditFormChange}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h6">{user.fullname}</Typography>
                                        <Typography>Email: {user.email}</Typography>
                                    </>
                                )}
                            </CardContent>
                            <CardActions>
                                {editUserID === user.id ? (
                                    <Button color="primary" onClick={handleEditFormSave}>Save</Button>
                                ) : (
                                    <>
                                        <Button color="primary" onClick={() => handleEditClick(user)}>Edit</Button>
                                        <Button color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    User successfully updated!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Users;
