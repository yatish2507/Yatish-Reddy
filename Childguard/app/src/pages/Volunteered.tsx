import React, { useEffect } from 'react';
import { Card, CardActions, Typography, Grid, Chip, IconButton, Button, Avatar } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

import DeleteIcon from '@mui/icons-material/Delete';
import { red, grey } from '@mui/material/colors';
import { VolunteerSignUp } from '../models/VolunteerSignUp';
import { deleteVolunteerSignup, updateVolunteerStatus } from '../services/volunteerSignup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../store';
import { deleteVolunteerSignupLocally, fetchProjectsByIds, fetchVolunteerSignups, updateVolunteerStatusLocally } from '../store/volunteered-slice';

const Volunteered: React.FC<{ userId: string }> = ({ userId }) => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const { projects, signUps } = useSelector((state: AppState) => state.volunteered);

    useEffect(() => {
        dispatch(fetchVolunteerSignups(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (signUps.length > 0) {
            const projectIds = signUps.map(signUp => signUp.projectId);
            dispatch(fetchProjectsByIds(projectIds));
            projects.forEach(project => {
                if (project.isCompleted == true) {
                    signUps.forEach(signUp => {

                        if (signUp.projectId === project.id && signUp.status !== "Closed") {
                            updateStatus(signUp, "Closed");
                        }
                    });
                }
            });
        }
    }, [dispatch, signUps]);
    const updateStatus = async (signup: VolunteerSignUp, newStatus: string) => {
        try {
            await updateVolunteerStatus(signup.id, newStatus);
            // setSignUps(signUps.map(s => s.id === signup.id ? updatedSignUp : s));
            dispatch(updateVolunteerStatusLocally({ id: signup.id, newStatus }));
        } catch (error) {
            console.error('Failed to update volunteer signup status:', error);
        }
    };

    const handleDelete = async (signupId: string) => {
        try {
            await deleteVolunteerSignup(signupId);
            console.log(`Deleted signup with id: ${signupId}`);
            dispatch(deleteVolunteerSignupLocally(signupId));
        } catch (error) {
            console.error('Failed to delete volunteer signup:', error);
        }
    };

    const getImagePath = (imageName: string) => "http://localhost:3002/volunteer/images/" + imageName;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed":
                return "#7fc68c"; // Assuming blue is for confirmed status
            case "Closed":
                return red[400];
            default:
                return grey[500]; // A default color for unknown or other statuses
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Oswald", sans-serif', fontSize: '70px', fontWeight: 400, letterSpacing: '2px', color: '#574849' }}>
                Volunteered Projects
            </Typography>
            <Grid container spacing={2}>
                {signUps.map(signUp => {
                    const project = projects.find(p => p.id === signUp.projectId);
                    return project && (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <Card raised sx={{ maxWidth: 500, overflow: 'hidden', transition: "0.3s", ":hover": { transform: "scale(1.03)" } }}>
                                <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}> {/* Adjust height as needed */}
                                    <img
                                        src={getImagePath(project.img)}
                                        alt="Project"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                                <Typography variant="h5" component="div" sx={{ fontFamily: '"Nunito", sans-serif', fontWeight: '300px', fontSize: '20px', marginTop: '3px', marginLeft: '3px' }}>
                                    {project.title}
                                </Typography>
                                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    {/* <Chip
                                        label={signUp.status}
                                        size="medium"
                                        sx={{ backgroundColor: getStatusColor(signUp.status), marginRight: '8px' }}
                                    /> */}
                                    <Chip
                                        avatar={<Avatar alt="Natacha" />}
                                        label={signUp.status}
                                        icon={<FaceIcon />}
                                        variant="outlined"
                                        sx={{ backgroundColor: getStatusColor(signUp.status), marginRight: '8px', width: '120px', justifyContent: 'flex-start' }}
                                    />
                                    <IconButton onClick={() => handleDelete(signUp.id)} aria-label="delete" size="large">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ color: '#574849', borderColor: '#574849' }}>
                                            Delete
                                        </Button>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default Volunteered;
