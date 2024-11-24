import { Container, Typography, Grid, Card, Box, CardContent } from '@mui/material';
import backgroundImage from '../images/founders.jpeg'; 
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation('common');

    return (
        <Container component="main" sx={{ marginTop: '30px', marginBottom: '30px' }} maxWidth={false}>
            <Grid container spacing={2}>
                <Grid item xs={10} sm={6} sx={{ marginBottom: '30px' }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ paddingTop: '30px', fontFamily: "'Oswald', sans-serif", fontWeight: 'bold' }}>
                        {t('homepage.about.title')}
                    </Typography>
                    <Typography paragraph sx={{ fontSize: 'large', paddingTop: '10px', fontFamily: "'Oswald', sans-serif", fontWeight: 'light' }}>
                        {t('homepage.about.detail')}
                    </Typography>
                    <Box sx={{ marginBottom: 4 }}>
                        <Typography variant="h5" component="h3" gutterBottom sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: '100px' }}>
                            {t('homepage.about.program')}
                        </Typography>
                        <ul >
                            <li>
                                <Typography variant="body1" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 'light' }}>
                                    <strong>{t('homepage.about.edu')}</strong> {t('homepage.about.edu.detail')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 'light' }}>
                                    <b>{t('homepage.about.health')}</b>{t('homepage.about.health.detail')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 'light' }} >
                                    <strong>{t('homepage.about.volunteer')}</strong> {t('homepage.about.volunteer.detail')}
                                </Typography>
                            </li>
                        </ul>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ marginTop: '20px' }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontFamily: "'Oswald', sans-serif", fontWeight: 'bold' }}>
                        {t('homepage.about.founder')}
                    </Typography>
                    <img src={backgroundImage} alt="ChildGuard" style={{ width: '650px', height: '400px', borderRadius: '20px', fontFamily: "'Oswald', sans-serif", marginLeft: '30px' }} />

                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center" >
                <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ color: 'black', borderRadius: '25px' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: '10px' }}>
                                {t('homepage.about.mission')}
                            </Typography>
                            <Typography paragraph sx={{ fontFamily: "'Oswald', sans-serif" }}>
                                {t('homepage.about.mission.detail')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ borderRadius: '25px' }}>
                        <CardContent sx={{ color: 'black' }}>
                            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: '10px' }}>
                                {t('homepage.about.vision')}
                            </Typography>
                            <Typography paragraph sx={{ fontFamily: "'Oswald', sans-serif" }}>
                                {t('homepage.about.vision.detail')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutPage;
