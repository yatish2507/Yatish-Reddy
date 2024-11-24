import { SafetyReport } from '../models/SafetyReport';

// Using fetch to perform the POST request
export const submitSafetyReport = async (data: SafetyReport): Promise<string> => {
    try {
        const response = await fetch('http://localhost:3000/reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return await response.json();// Assuming the server returns JSON data
    } catch (error) {
        console.error('Failed to submit safety report:', error);
        throw error; // Re-throw the error for further handling if needed
    }
};
