import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import image1 from '../images/partner.png';

const PartnerWithUsPage = () => {
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',

        }}>
            <img
                src={image1}
                alt="Partnership Opportunities"
                style={{
                    maxWidth: '30%',
                    height: 'auto', // Maintain aspect ratio
                    borderRadius: '8px',
                    // Margin-bottom
                }}
            />
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Partner with Us
            </Typography>
            <Typography paragraph align="center">
                ChildGuard collaborates with various organizations, donors, and volunteers to expand and enhance our impact. We welcome partnerships with businesses, non-profits, educational institutions, and healthcare providers who share our commitment to child welfare.

            </Typography>
            <Typography variant="h6" gutterBottom align="center">
                Opportunities for Partnership:
            </Typography>
            <Box sx={{ ml: 4, textAlign: 'left' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography paragraph>
                            <strong>Corporate Sponsorship:</strong> Align your brand with ChildGuard and help us expand our programs through financial support or in-kind donations.
                        </Typography>
                        <Typography paragraph>
                            <strong>Health and Wellness Initiatives:</strong> Partner with us to provide health resources and services to communities.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography paragraph>
                            <strong>Educational Collaborations:</strong> Work with us to develop or distribute educational materials and programs.
                        </Typography>
                        <Typography paragraph>
                            <strong>Technology and Innovation:</strong> Help us leverage technology to create more effective solutions for education and health care.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant="h6" gutterBottom align="center">
                Contact for Partnerships:
            </Typography>
            <Typography paragraph align="center">
                <strong>Email:</strong> partnerships@childguard.org
                <br />
                <strong>Phone:</strong> +1 234-567-8910
            </Typography>
            <Typography paragraph align="center">
                We are excited to explore how we can work together to make a lasting impact. Contact us today to start a conversation about potential collaboration.
            </Typography>
        </Container>
    );
};

export default PartnerWithUsPage;
