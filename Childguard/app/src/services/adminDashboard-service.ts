// src/services/api.ts

// Define the base URL for all API requests
const BASE_URL = 'http://localhost:3000';  // Adjust this as needed for different environments

// Generic Fetch Wrapper
const callApi = async (endpoint: string, method: string = 'GET', body?: object) => {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
};

// Users
export const fetchUsers = () => callApi('/users');
export const updateUser = (id: string, data: object) => callApi(`/users/${id}`, 'PATCH', data);
export const deleteUser = (id: string) => callApi(`/users/${id}`, 'DELETE');

// Projects
export const fetchProjects = () => callApi('/projects');
export const updateProject = (id: string, data: object) => callApi(`/projects/${id}`, 'PATCH', data);
export const deleteProject = (id: string) => callApi(`/projects/${id}`, 'DELETE');

// Volunteers
export const fetchVolunteers = () => callApi('/volunteerSignups');
export const updateVolunteer = (id: string, data: object) => callApi(`/volunteerSignups/${id}`, 'PATCH', data);
export const deleteVolunteer = (id: string) => callApi(`/volunteerSignups/${id}`, 'DELETE');

// Donations
export const fetchDonations = () => callApi('/donate');
export const updateDonation = (id: string, data: object) => callApi(`/donate/${id}`, 'PATCH', data);
export const deleteDonation = (id: string) => callApi(`/donate/${id}`, 'DELETE');

// Safety Reports
export const fetchSafetyReports = () => callApi('/reports');
export const updateSafetyReport = (id: string, data: object) => callApi(`/reports/${id}`, 'PATCH', data);
export const deleteSafetyReport = (id: string) => callApi(`/reports/${id}`, 'DELETE');
