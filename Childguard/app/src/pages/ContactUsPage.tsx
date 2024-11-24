import { Container, Typography, Box } from '@mui/material';
import logo from '../images/logo-png.png'

const ContactUs = () => {
    return (
        <Container component="main" sx={{ mt: 4 }}>
            <img src={logo} alt="ChildGuard" style={{ maxWidth: '400px', height: '250px', display: 'block', margin: 'auto' }} />
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                Contact Us
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography paragraph>
                    For inquiries, support, or feedback, please reach out to us. Our team is ready to assist you and provide the information you need. Your involvement and questions are invaluable to our mission.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Email:
                </Typography>
                <Typography paragraph>
                    info@childguard.org
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Phone:
                </Typography>
                <Typography paragraph>
                    +1 234-567-8900
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Address:
                </Typography>
                <Typography paragraph>
                    1234 ChildGuard, Boston, MA, 12345
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Office Hours:
                </Typography>
                <Typography paragraph>
                    Monday - Friday: 9:00 AM - 5:00 PM

                    Saturday - Sunday: Closed
                </Typography>
            </Box>
        </Container>
    );
}
export default ContactUs;
