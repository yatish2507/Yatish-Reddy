// import { HealthResource } from '../models/HealthResource';

export const getHealthResource = async () => {
    try {
        const response = await fetch(`http://localhost:3000/healthResources`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Resources');
        }
        return response.json();// Assuming the server returns JSON data
    } catch (error) {
        console.error('Failed to get resources', error);
        throw error; // Re-throw the error for further handling if needed
    }
};
