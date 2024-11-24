import { Project } from '../models/Project.ts';

export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await fetch('http://localhost:3000/projects', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return await response.json(); // Assuming the server returns JSON data
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error; 
    }
};

export const volunteer = async (projectData : { userId :string , projectId : string} ) => {
    try {
        const response = await fetch('http://localhost:3000/volunteerSignups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectData }),
            });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error; 
    }
};