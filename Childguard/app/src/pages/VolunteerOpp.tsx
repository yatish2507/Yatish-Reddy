import { SyntheticEvent, useEffect } from 'react';
import { Project } from '../models/Project.ts';
// import { fetchProjects } from '../services/volunteerOpp.ts';
import { Container, Grid, Card, CardContent, Button, Typography, CardMedia, Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../store/index.ts';
import { User } from '../models/User.ts';
import MuiAlert from '@mui/material/Alert';
import { fetchProjectsAsync, fetchUserVolunteerSignups, toggleLoginAlert, toggleProjectModal, volunteerForProject } from '../store/volunteer-opp-slice.ts';
import { VolunteerSignUp } from '../models/VolunteerSignUp.ts';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const VolunteerOpp = () => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const {
        projects,
        loading,
        volunteered,
        selectedProject,
        openModal,
        showLoginAlert
    } = useSelector((state: AppState) => state.volunteer);

    const user: User = useSelector((state: AppState) => state.login.user as User);
    const volunteerSignUps: VolunteerSignUp[] = useSelector((state: AppState) => state.volunteered.signUps);

    useEffect(() => {
        dispatch(fetchProjectsAsync());
        if (user) {
            dispatch(fetchUserVolunteerSignups(user.id as string));
        }
    }, [dispatch, user, volunteerSignUps]);

    const getImagePath = (imageName: string) => "http://localhost:3002/volunteer/images/" + imageName;

    const handleVolunteer = (projectId: string) => {
        if (user) {
            dispatch(volunteerForProject({ userId: user.id as string, projectId, status : "Confirmed"}));
            dispatch(fetchUserVolunteerSignups(user.id as string));
        } else { 
            dispatch(toggleLoginAlert(true));
        }
    };

    const handleLearnMore = (project: Project) => {
        dispatch(toggleProjectModal(project));
    };

    const handleClose = () => {
        dispatch(toggleProjectModal(null));
    };

    const handleCloseSnackbar = (event: SyntheticEvent<Element, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(toggleLoginAlert(false));
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h2" component="h1" align='center' style={{ fontWeight: 700, fontFamily: "'Oswald', sans-serif", marginBottom: '30px' }}>
                How to Volunteer with Childguard
            </Typography>
            <Typography variant="subtitle1" align='center' style={{ marginBottom: '30px', fontFamily: "'Nunito', sans-serif", fontSize: '30px' }}>
                Thank you for your interest in becoming a volunteer!
            </Typography>
            <Typography paragraph align='center' style={{ marginBottom: '25px', fontFamily: "'Nunito', sans-serif", fontSize: '15px' }}>
                At Chilguard we beleive in doing whatever it takes for children in need. There are many ways you can volunteer to support our mission. From one-time opportunities to ongoing partnerships, your involvement on behalf of children can start a ripple of change – changing the lives of children and the future we all share.
            </Typography>
            <Box style={{ backgroundColor: '#f5f5f5', padding: '2em', borderRadius: '8x' }}>
                <Grid container spacing={4}>
                    {projects.map((project) => (
                        <Grid item key={project.id} lg={6}>
                            <Card>
                                <Box sx={{ position: 'relative', height: 300 }}>
                                    <CardMedia
                                        component="img"
                                        image={getImagePath(project.img)}
                                        alt={project.title}
                                        sx={{ width: '100%', height: '100%', transition: 'transform .2s', '&:hover': { transform: 'scale(1.05)' } }}
                                    />
                                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                                        <Typography variant="h5" component="div" style={{ fontSize: '20px' }}>
                                            {project.title}
                                        </Typography>
                                        <Button size="large" color="primary" variant="contained" onClick={() => handleLearnMore(project)}>
                                            Learn More
                                        </Button>
                                    </Box>
                                </Box>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    {volunteered[project.id] ? (
                                        <Typography variant="subtitle1" color="primary">
                                            Successfully volunteered!
                                        </Typography>
                                    ) : (
                                        <Button size="large" color="primary" variant="contained" onClick={() => handleVolunteer(project.id)}>
                                            Volunteer
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    <Snackbar open={showLoginAlert} autoHideDuration={6000}>
                        <MuiAlert onClose={handleCloseSnackbar} severity="warning" elevation={6} variant="filled">
                            You need to be logged in
                        </MuiAlert>
                    </Snackbar>
                </Grid>
            </Box>
            {selectedProject && (
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={openModal}
                >
                    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center', fontFamily: "'Nunito', sans-serif" }} color="primary" id="customized-dialog-title">
                        {selectedProject.title}
                    </DialogTitle>
                    <DialogContent dividers sx={{ fontFamily: '"Work Sans", sans-serif' }}>
                        <Typography gutterBottom>
                            {selectedProject.description}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            )}
        </Container>
    );
};

export default VolunteerOpp;
