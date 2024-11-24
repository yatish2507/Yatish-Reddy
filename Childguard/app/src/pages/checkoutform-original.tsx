import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import cardimg from '../images/edit2.jpeg';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import { usePaymentStatus } from './usePaymentStatus';
import { postAmountToDatabase } from '../services/donation-service';
import { Donation } from '../models/Donation';

interface CheckoutFormProps {
    selectedAmount: string;  // Ensure this is correctly typed as a string
    userID: string
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ selectedAmount, userID }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { showPaymentStatus, PaymentStatusDisplay } = usePaymentStatus();
    // Properly type the event parameter
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from submitting normally

        if (!stripe || !elements) {
            console.log("Stripe.js has not yet loaded.");
            return; // Disable form submission until Stripe.js has loaded.
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.error('[error]', error);
                showPaymentStatus(false, 'Payment failed: ' + error.message);
            } else {
                console.log('[PaymentMethod]', paymentMethod);
                showPaymentStatus(true, 'Payment Method successfully created!');
                const data: Donation = {
                    userId: userID as string,
                    amount: selectedAmount as string
                };
                console.log(data);
                console.log('Sending data:', JSON.stringify(data));
                await postAmountToDatabase(data);

            }
        }
    };
    return (
        <>
            {PaymentStatusDisplay() || (<Card sx={{ maxWidth: 480, mx: 'auto', mt: 4, height: 300 }}>

                <CardContent sx={{ background: `url(${cardimg})`, backgroundsize: 'cover', height: '70vh', overflow: 'hidden', }} >
                    <Typography variant="h6" component="h2" gutterBottom color={'white'}>
                        Payment Information
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <CardElement options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: 'white',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary" disabled={!stripe}>
                                Pay
                            </Button>
                        </Box>
                    </form>
                </CardContent >
            </Card>
            )}
        </>
    );

};
export default CheckoutForm;