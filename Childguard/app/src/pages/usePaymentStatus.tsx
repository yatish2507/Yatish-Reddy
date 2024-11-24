// usePaymentStatus.tsx
import { useState } from 'react';
import PaymentStatusCard from '../components/PaymentStatusCard'; // Import the PaymentStatusCard component

export const usePaymentStatus = () => {
    const [paymentStatus, setPaymentStatus] = useState<{ success: boolean; message: string } | null>(null);

    const showPaymentStatus = (success: boolean, message: string) => {
        setPaymentStatus({ success, message });
    };

    const clearPaymentStatus = () => {
        setPaymentStatus(null); // Resets the payment status to allow retries
    };

    const handleRetry = () => {
        clearPaymentStatus();
    };

    const handleDone = () => {
        window.location.href = '/success-page'; // Redirect to success page
    };

    const PaymentStatusDisplay = () => {
        if (!paymentStatus) return null;

        return <PaymentStatusCard
            success={paymentStatus.success}
            onRetry={handleRetry}
            onDone={handleDone}
        />;
    };

    return { showPaymentStatus, PaymentStatusDisplay };
};
