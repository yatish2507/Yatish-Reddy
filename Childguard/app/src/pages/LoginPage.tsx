import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import backgroundImage from '../images/LoginPageImage.jpeg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChildGuardLogo from '../images/logo-png.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, validateAllFields, loginUser } from '../store/login-form-slice';
import { AppDispatch, AppState } from '../store';
import { LoginFormFields } from '../models/logInFormData';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { UserRole } from '../models/User';
import { User, UserRole } from '../models/User';
import { useEffect } from 'react';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#574849',
    },
    text: {
      primary: '#574849;',
    }
  },
});

export default function SignInSide() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { formData, errors, generalError } = useSelector((state: AppState) => state.login);
  const user: User = useSelector((state: AppState) => state.login.user as User);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateField({ field: name as keyof LoginFormFields, value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(validateAllFields());
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    const formIsValid = allFieldsFilled && Object.values(errors).every(error => error === '');
    if (formIsValid) {
      dispatch(loginUser({
        email: formData.email,
        password: formData.password
      }))
      console.log(user);
      console.log('Form data:', formData);
    }
  };

  useEffect(() => {
    if (user) { // Check if user data is available or has changed
      console.log('User Details:', user);
      if (user.userrole === UserRole.User)
        navigate('/dashboard');
      else
        navigate('/admin');
    }
  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={ChildGuardLogo} alt="Login Icon" style={{ width: '50%', height: '50%', position: 'relative', top: '40px' }} />
            <Typography component="h1" variant="h5" sx={{ paddingTop: "60px" }}>
              Sign in
            </Typography>
            {generalError && <ErrorMessage message={generalError} />}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email}
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password}
                value={formData.password}
                onChange={handleChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}