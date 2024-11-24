import { Donation } from '../models/Donation';

export const postAmountToDatabase = async (data: Donation) => {
    console.log(data);
    try {
        const response = await fetch('http://localhost:3000/donate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return await response.json();

        console.log('Donation posted:', data);
    } catch (error) {
        console.error('Error posting donation:', error);
    }
};


// import { HealthResource } from '../models/HealthResource';

export const fetchDonations = async (userId: string): Promise<Donation[]> => {
    try {
        const response = await fetch(`http://localhost:3000/donate?keyword=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong while fetching donations');
        }
        return await response.json(); // The response must match the Donation[] type
    } catch (error) {
        console.error('Failed to fetch donations:', error);
        throw error;
    }
};
