import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../models/Project';
import { fetchProjects } from '../services/volunteerOpp';
import {volunteer} from '../services/volunteerOpp'; 
import { VolunteerSignUp } from '../models/VolunteerSignUp';

interface VolunteerState {
    projects: Project[];
    loading: boolean;
    error: string | null;
    volunteered: { [projectId: string]: boolean };
    selectedProject: Project | null;
    openModal: boolean;
    showLoginAlert: boolean;
}

const initialState: VolunteerState = {
    projects: [],
    loading: false,
    error: null,
    volunteered: {},
    selectedProject: null,
    openModal: false,
    showLoginAlert: false
};

export const fetchUserVolunteerSignups = createAsyncThunk(
    'volunteer/fetchUserVolunteerSignups',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/volunteerSignups?keyword=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch volunteer signups');
            }
            const volunteerSignups = await response.json();
            return volunteerSignups.map((signup : VolunteerSignUp) => signup.projectId);
        } catch (error) {
            console.error('Error fetching user volunteer signups:', error);
            return rejectWithValue('Failed to retrieve volunteer status');
        }
    }
);

// Async thunk for fetching projects
export const fetchProjectsAsync = createAsyncThunk(
    'volunteer/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchProjects();
            return data;
        } catch (error) {
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const volunteerForProject = createAsyncThunk(
    'volunteer/volunteerForProject',
    async (projectData : { userId :string , projectId : string, status: string}, { rejectWithValue }) => {
        try {
            const data = await volunteer(projectData);
            return data.projectId;
        } catch (error) {
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const volunteerSlice = createSlice({
    name: 'volunteer',
    initialState,
    reducers: {
        toggleProjectModal: (state, action: PayloadAction<Project | null>) => {
            state.selectedProject = action.payload;
            state.openModal = !state.openModal;
        },
        toggleLoginAlert: (state, action: PayloadAction<boolean>) => {
            state.showLoginAlert = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjectsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch projects';
            })
            .addCase(volunteerForProject.pending, (state) => {
            })
            .addCase(volunteerForProject.fulfilled, (state, action) => {
                state.volunteered[action.payload] = true;
            })
            .addCase(volunteerForProject.rejected, (state, action) => {
                state.error = 'Failed to update projects';
            })
            .addCase(fetchUserVolunteerSignups.fulfilled, (state, action) => {
                state.volunteered = {};
                action.payload.forEach((projectId : string) => {
                    state.volunteered[projectId] = true;
                });
            });
    }
});

export const { toggleProjectModal, toggleLoginAlert } = volunteerSlice.actions;
export default volunteerSlice.reducer;
