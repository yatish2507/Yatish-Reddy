import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import successImage from '../images/success.png'; // Path to your success image
import failureImage from '../images/failure.png'; // Path to your failure image
import { useNavigate } from 'react-router-dom';

interface PaymentStatusCardProps {
    success: boolean;
    onRetry: () => void; // Function to handle retry
    onDone: () => void; // Function to handle redirection
}

const PaymentStatusCard: React.FC<PaymentStatusCardProps> = ({ success, onRetry, onDone }) => {
    const navigate = useNavigate();
    onDone = () => {
        navigate('/dashboard');
    }
    return (
        <Card sx={{
            maxWidth: 345,
            margin: 'auto',
            mt: 4,
            backgroundColor: '#2f2f4f',  
            backdropFilter: 'blur(1px)',  
            boxShadow: 'none',
            border: 'none' 
        }}>
            <CardMedia
                component="img"
                height="140"
                image={success ? successImage : failureImage}
                alt={success ? "Payment Successful" : "Payment Failed"}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                    {success ? "Payment Successful" : "Payment Failed"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                    {success ? "Your payment has been processed successfully." : "There was a problem processing your payment."}
                </Typography>
            </CardContent>
            <CardActions>
                {success ? (
                    <Button size="small" color="primary" onClick={onDone}>
                        Done
                    </Button>
                ) : (
                    <Button size="small" color="primary" onClick={onRetry}>
                        Retry
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default PaymentStatusCard;
