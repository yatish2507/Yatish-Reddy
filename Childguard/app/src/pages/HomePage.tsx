// import AppBar from '@mui/material/AppBar';
// import Grid from '@mui/material';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import HomePageImage from '../images/HomePage.jpeg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChildGuardLogo from '../images/logo-png.png'
import About from './About.tsx';
// import { Link } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const theme = createTheme({
  palette: {
    primary: {
      main: '#574849;', // Adjust the color to match your brand
    },
    secondary: {
      main: '#f9b934', // Adjust for secondary color if needed
    },
    text: {
      primary: '#fff;',
    }

  },
});

export default function HomePage() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation('common');

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Background image with overlay */}
        <Box
          sx={{
            position: 'relative',
            height: 'calc(100vh - 64px)', // Adjust height depending on AppBar height
            background: `url(${HomePageImage}) no-repeat center center`,
            backgroundSize: 'cover',
            '&::before': { // Pseudo-element for overlay
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay color
              zIndex: 1,
            },
          }}
        >
          {/* Main content, visually on top of the background and overlay */}
          <Container
            maxWidth="md"
            component="main"

            sx={{
              pt: 6,
              pb: 6,
              position: 'relative',
              zIndex: 2, // Higher zIndex to be above the overlay
            }}
          >
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom sx={{ fontFamily: "'Oswald', sans-serif", paddingTop: '220px', fontWeight: 'bold' }}>
              {t('homepage.center.title')}
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" component="p" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: '500px' }}>
              {t('homepage.center.subtitle')}
            </Typography>
          </Container>
        </Box>
        <About />
        <Box component="footer" sx={{ bgcolor: '#f5f5f5', py: 1, marginTop: '20px' }}>
          <Container maxWidth="lg">
            <img src={ChildGuardLogo} alt="Login Icon" style={{ width: '30%', height: '30%', paddingLeft: "400px" }} />
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p" sx={{ fontFamily: "'Oswald', sans-serif" }}>
              {t('homepage.logo.slogan')}
            </Typography>
            <Box mt={3} sx={{ marginLeft: "475px" }}>
              {/* <Link color="textSecondary" to="/about" style={{ marginRight: 20, color: 'inherit', textDecoration: 'none' }} >
              About
            </Link> */}
              <Link color="textSecondary" to="/contact" style={{ marginRight: 20, color: 'inherit', textDecoration: 'none', fontFamily: "'Oswald', sans-serif" }}>
                {t('homepage.footer.contact')}
              </Link>
              <Link color="textSecondary" to="/partner" style={{ marginRight: 20, color: 'inherit', textDecoration: 'none', fontFamily: "'Oswald', sans-serif" }} >
                {t('homepage.footer.partner')}
              </Link>
            </Box>
            <div style={{ marginLeft: '490px' }}>
              <Button onClick={() => switchLanguage('en')} style={{ marginRight: 8, color: 'inherit', textDecoration: 'none', fontFamily: "'Oswald', sans-serif" }}>
                English
              </Button>
              <Button onClick={() => switchLanguage('ka')} style={{ marginRight: 20, color: 'inherit', textDecoration: 'none', fontFamily: "'Oswald', sans-serif" }}>
                Kannada
              </Button>
            </div>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4, fontFamily: "'Oswald', sans-serif" }}>
              © {currentYear} ChildGuard - All Rights Reserved.
            </Typography>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}
