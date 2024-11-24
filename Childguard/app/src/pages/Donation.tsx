import React, { SyntheticEvent, useState } from 'react';
// import { useEffect } from 'react';
import { Typography, TextField, Button, Box, FormControl, FormLabel, ToggleButtonGroup, ToggleButton, Paper, Snackbar } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutform-original';
import MuiAlert from '@mui/material/Alert'; // This will be your component to handle the payment form
// import { Donation } from '../models/Donation';
// import { getDonations } from '../services/donation-service';
import { Grid } from '@mui/material';
import { User } from '../models/User';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
// import { useNavigate } from 'react-router-dom';
const DonationComponent: React.FC = () => {
  const stripePromise = loadStripe('pk_test_51P65NdRoQ09quVmjfDfKZJA5L0SQWIDK7B3PzWHdy1mFIs9OKiiNwtcwnjiCaHEUJMFro3ExJ3PIZS6Kmb2lcY6M00knTZMe7R');
  const [showCheckout, setShowCheckout] = useState(false);  // This line adds state to show or hide the checkout form
  const [amount, setAmount] = useState('10');  // Default amount is $10
  const [customAmount, setCustomAmount] = useState('');
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  // const [donation, setDonation] = useState<Donation[]>([]);
  const user: User = useSelector((state: AppState) => state.login.user as User);
  const handleAmountChange = (_: React.MouseEvent<HTMLElement>, newAmount: string | null) => {
    if (newAmount !== null) { // Ensure the selected amount isn't null
      setAmount(newAmount);
    }
  };

  const handleCustomAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(event.target.value);
  };
  const handleDonateClick = () => {
    if (user) {
      setShowCheckout(true);
    } else {
      setShowLoginAlert(true);
    }
  };

  const handleCloseSnackbar = (event: SyntheticEvent<Element, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowLoginAlert(false);
  };
  return (
    <div style={{
      backgroundColor: '#21213b',
      // backgroundPosition: 'center',
      minHeight: '100vh', // Ensure it covers the full view height
      width: '100vw', // Ensure it covers the full view width
    }}>
      <Elements stripe={stripePromise} >
        <Grid container justifyContent="center" alignItems="center" >
          <Paper elevation={3} sx={{ p: 4, maxWidth: 750, bgcolor: '#2f2f4f', marginTop: '20px' }}>
            <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              Help us do more
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'white', wordSpacing: '2px' }}>
              We'll Get Right To The Point: We're Asking You To Support Us And Our Cause. We're a Non-Profit That Relies On Support From People
              Like You. Your Donations Ensure That More Children Get The Assistance They Need.
              We provide A Safe Space For Learning,Educational Opportunities and Health Guides for them.
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: 'white' }}>Select Donation Amount</FormLabel>
              <ToggleButtonGroup
                value={amount}
                exclusive
                onChange={handleAmountChange}
                aria-label="donation-amount"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between', // This will space out the buttons across the available width
                  '.MuiToggleButtonGroup-grouped': {
                    mr: 1, // Add space to the right of each button
                    color: 'white', // Default text color
                    width: '75px',
                    height: '35px',
                    borderColor: 'white',
                    borderRadius: '20px',// Default border color
                    '&.Mui-selected': {
                      color: 'black', // Text color when selected
                      backgroundColor: 'white', // Background color when selected
                    },
                    '&:hover': {
                      backgroundColor: 'white', // Background color on hover
                      color: 'black', // Text color on hover
                    },
                    '&:last-child': {
                      mr: 0, // Remove margin from the last button
                    }
                  }
                }}
              >
                <ToggleButton value="10" aria-label="$10" sx={{ color: 'white' }}>
                  $10
                </ToggleButton>
                <ToggleButton value="20" aria-label="$20" sx={{ color: 'white' }}>
                  $20
                </ToggleButton>
                <ToggleButton value="50" aria-label="$50" sx={{ color: 'white' }}>
                  $50
                </ToggleButton>
                <ToggleButton value="100" aria-label="$100" sx={{ color: 'white' }}>
                  $100
                </ToggleButton>
                <ToggleButton value="other" aria-label="Other" sx={{ color: 'white' }}>
                  Other
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
            {amount === 'other' && (
              <TextField
                label="Enter your amount"
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                margin="normal"
                fullWidth
                InputLabelProps={{
                  style: { color: 'white' } // Sets the color of the label
                }}
                InputProps={{
                  style: { color: 'white', borderColor: 'white' }, // Sets the color of the input text

                }}
                sx={{
                  '& label.Mui-focused': {
                    color: 'white', // Color of the label when the input is focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white', // Color of the border
                    },
                    '&:hover fieldset': {
                      borderColor: 'white', // Color of the border on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', // Color of the border when the input is focused
                    }
                  }
                }}
              />
            )}
            <br></br>
            <Box sx={{
              mt: 2,
              py: 2,
              px: 3,
              bgcolor: '#21213b',
              borderRadius: '8px',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
              display: 'inline-block'
            }}>
              <Typography variant="h6" sx={{
                fontWeight: 'medium',
                color: 'white',
                display: 'inline',
                letterSpacing: '0.1rem',
                textShadow: '1px 1px 2px black'  // Enhancing visibility against backgrounds
              }}>
                Selected Amount: ${amount === 'other' ? customAmount : amount}
              </Typography>
            </Box>
            <div style={{ marginTop: '30px' }}>
              <Button variant="contained" color="primary" onClick={handleDonateClick}>
                Donate now
              </Button>
            </div>
            {/* <FormControlLabel
              control={<Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { color: 'white' } }} />}
              label="Yes, I'll generously add $0.75 each month to cover the transaction fees."
              sx={{ mb: 3, color: 'white' }}
            /> */}




            {showCheckout && <CheckoutForm selectedAmount={amount === 'other' ? customAmount : amount} userID={user.id as string} />} {/* add user id here */}
            <Snackbar open={showLoginAlert} autoHideDuration={6000}>
              <MuiAlert onClose={handleCloseSnackbar} severity="warning" elevation={6} variant="filled">
                You need to be logged in
              </MuiAlert>
            </Snackbar>
          </Paper>
        </Grid>




      </Elements>
    </div >
  );
};

export default DonationComponent;

