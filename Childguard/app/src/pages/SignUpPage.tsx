import React, { ChangeEvent, useEffect, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signUpImage from '../images/Sign-Up-Image.jpeg';
import { updateField, validateAllFields, resetForm, submitUser } from '../store/sign-up-form-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../store';
import ChildGuardLogo from '../images/logo-png.png';
import { User, UserRole } from '../models/User';
import {submitUserData} from '../services/UserService';
import { useNavigate } from 'react-router-dom';

// Replace with your project's theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#574849',
    }
  },
});
const SignUp: React.FC = () => {

    const dispatch : AppDispatch = useDispatch<AppDispatch>();
    const { formData, errors, isLoading, generalError } = useSelector((state: AppState) => state.signUpForm);

  const [showPassword, setShowPassword] = useState(false); 

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(event.target.checked);
  };

  const navigate = useNavigate();

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  dispatch(updateField({ field: name as keyof typeof formData, value }));
};


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(validateAllFields());

    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    const formIsValid = allFieldsFilled && Object.values(errors).every(error => error === '');
    if (formIsValid) {
        const newUser: User = {
            fullname: formData.firstName + " " + formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            userrole: UserRole.User
        };

        try {
            dispatch(submitUser(newUser));
            console.log("Form is valid and ready to submit:", newUser);
            navigate('/login');
        } catch (error) {
            console.error("Error submitting user data:", error);
        }
    } else {
        console.error("Form contains errors:", errors);
    }
};

  return (
    <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={6} component={Paper} square sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                zIndex: 1,
                background: '#fff'
            }}>
              <img src={ChildGuardLogo} alt="Login Icon" style={{ width: '50%', height: '20%'}} />
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Create new account.
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '75%', mx: 'auto', mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="given-name"
                                variant="filled"
                                sx={{ backgroundColor: 'white', borderRadius: 2, border: 'none' }}
                                value={formData.firstName}
                                onChange={handleChange}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName || ' '}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                variant="filled"
                                sx={{ backgroundColor: 'white', borderRadius: 2, border: 'none' }}
                                value={formData.lastName}
                                onChange={handleChange}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName || ' '}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        variant="filled"
                        error={Boolean(errors.username)}
                        helperText={errors.username || ' '}
                        sx={{ backgroundColor: 'white', borderRadius: 2, border: 'none' }}
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        variant="filled"
                        error={Boolean(errors.email)}
                        helperText={errors.email || ' '}
                        sx={{ backgroundColor: 'white', borderRadius: 2, border: 'none' }}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        variant="filled"
                        error={Boolean(errors.password)}
                        helperText={errors.password || ' '}
                        sx={{ backgroundColor: 'white', borderRadius: 2, border: 'none' }}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={showPassword} onChange={handleCheckboxChange} name="showPassword" />}
                        label="Show Password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1.5, backgroundColor: '#574849' }}
                    >
                        Create account
                    </Button>
                    <Link href="/login" variant="body2">
                        Already a member? Log in
                    </Link>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                sx={{
                    backgroundImage: `url(${signUpImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    zIndex: 0
                }}
            />
        </Grid>
    </ThemeProvider>
);
}
export default SignUp;
