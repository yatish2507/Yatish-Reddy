import { User } from "../models/User";
import { LoginFormFields } from "../models/logInFormData";

export const submitUserData = async (user: User) => {
    try {
        const response = await fetch('http://localhost:3000/users', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to submit user data');
        }
        const result = await response.json();
        console.log('User created:', result);
    } catch (error) {
        console.error("Error submitting user data:", error);
    }
};


export const loginUserData = async ({ email, password }: LoginFormFields) => {
    try{
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to login user');
        }
        return data;
    }catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}
      
export const fetchUserData = async (id: String): Promise<User>  => {
    try{
        const response = await fetch(`http://localhost:3000/users/${id}`,  {  
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Something went wrong while fetching volunteer signups');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch User data:', error);
        throw error;
    }
} 

export const updateUserData = async (userId: string, data: Partial<User>): Promise<User> => {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Failed to update user data:', error);
        throw error;
    }
};

