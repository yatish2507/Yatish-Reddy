import { VolunteerSignUp } from "../models/VolunteerSignUp";

export const fetchVolunteerSignups = async (): Promise<VolunteerSignUp[]> => {
    try {
        const response = await fetch(`http://localhost:3000/volunteerSignups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong while fetching volunteer signups');
        }
        return await response.json(); // Assuming the server returns JSON data
    } catch (error) {
        console.error('Failed to fetch volunteer signups:', error);
        throw error;
    }
};

export const fetchVolunteerbyUserId = async (userid: string): Promise<VolunteerSignUp[]> => {
    try {
        const response = await fetch(`http://localhost:3000/volunteerSignups?keyword=${userid}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const signUpsData: VolunteerSignUp[] = await response.json();
        return signUpsData;
    } catch (error) {
        console.error('Failed to fetch volunteer signups:', error);
        throw error;
    }
}

export const deleteVolunteerSignup = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/volunteerSignups/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            // If the server response is not ok, throw an error.
            throw new Error(`Failed to delete volunteer signup with id: ${id}`);
        }

        // You can return something here if needed, but DELETE operations typically don't return a body.
    } catch (error) {
        console.error('Failed to delete volunteer signup:', error);
        throw error; // Re-throw the error to be handled by the caller.
    }
}

export const updateVolunteerStatus = async (signupId: string, status: string): Promise<VolunteerSignUp> => {
    try {
        const response = await fetch(`http://localhost:3000/volunteerSignups/${signupId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }), // Assuming status is the field you want to update
        });

        if (!response.ok) {
            throw new Error(`Failed to update volunteer signup status with id: ${signupId}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to update volunteer signup status:', error);
        throw error;
    }
};
