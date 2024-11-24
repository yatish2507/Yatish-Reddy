import { AppBar, Toolbar, Box, Button, createTheme, ThemeProvider, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ChildGuardLogo from '../images/logo-png.png';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { User } from '../models/User';
import Person2Icon from '@mui/icons-material/Person2';
import { useTranslation } from 'react-i18next';
const AppBarComponent = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#574849;',
      },
      secondary: {
        main: '#f9b934',
      },
      text: {
        primary: '#fff;',
      }
    },
  });

  const navigate = useNavigate();

  // Function to handle a click event that navigates to the homepage.
  const handleClick = () => {
    navigate('/');
  };

  // Retrieve the current user from Redux state using the useSelector hook.
  const user: User = useSelector((state: AppState) => state.login.user as User);

  // Function to handle a click event that navigates to the user dashboard.
  const handleClickUser = () => {
    navigate('/dashboard');
  };

  // Function to extract the first name from a full name string.
  const getFirstName = (fullname: string) => {
    return fullname.split(' ')[0];
  };

  // Use the useTranslation hook from 'react-i18next' for internationalization, focusing on common texts.
  const { t } = useTranslation('common');

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <img src={ChildGuardLogo} alt="Home Icon" style={{ width: '10%', height: '10%', cursor: 'pointer' }} onClick={handleClick} />
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box component="nav" color="inherit"
              sx={{
                fontFamily: "'Oswald', sans-serif",
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                '& a': {
                  marginLeft: 2,
                  marginRight: 2,
                  color: 'black',
                  fontSize: 'large',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  paddingRight: '10px'
                },
                '& a:last-child': {
                  marginRight: 0
                }
              }}>
              <Link color="textSecondary" to="/education"  >
                {t('appbar.link.edu.label')}
              </Link>
              <Link color="textSecondary" to="/health" >
                {t('appbar.link.hn.label')}
              </Link>
              <Link color="textSecondary" to="/donate"  >
                {t('appbar.link.donate.label')}
              </Link>
              <Link color="textSecondary" to="/volunteer" >
                {t('appbar.link.Volunteer.label')}
              </Link>
              <Link color="textSecondary" to="/safetyreport" >
                {t('appbar.link.report.label')}
              </Link>
            </Box>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClickUser}>
                <Person2Icon sx={{ fontSize: 30, marginRight: 1, marginLeft: 1 }} />
                <Typography variant="subtitle1">{getFirstName(user.fullname)}</Typography>
              </Box>
            ) : (
              <>
                <Link color="textSecondary" to="/login">
                  <Button color="primary" variant="outlined" sx={{ margin: 1 }}>
                    {t('appbar.login.label')}
                  </Button>
                </Link>
                <Link color="textSecondary" to="/signup">
                  <Button color="primary" variant="contained" sx={{ margin: 1 }}>
                    {t('appbar.signup.label')}
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default AppBarComponent;
