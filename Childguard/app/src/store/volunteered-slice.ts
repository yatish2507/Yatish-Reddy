// volunteerSlice.js
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../models/Project';
import { VolunteerSignUp } from '../models/VolunteerSignUp';
import { AppState } from '.';


interface VolunteerState {
    projects: Project[];
    signUps: VolunteerSignUp[];
    loading: boolean;
    error: string | null;
}

interface UpdateStatusPayload {
    id: string;
    newStatus: string;
}
// Async thunk to fetch volunteer signups by user ID
export const fetchVolunteerSignups = createAsyncThunk(
    'volunteer/fetchVolunteerSignups',
    async (userId : string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/volunteerSignups?keyword=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch volunteer signups');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching volunteer signups:', error);
            const errorMessage = error as Error;
            return rejectWithValue(errorMessage.message);
        }
    }
);

// Async thunk to fetch projects based on IDs
export const fetchProjectsByIds = createAsyncThunk(
    'volunteer/fetchProjectsByIds',
    async (projectIds : string[], { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/projects/multiple?ids=${projectIds.join(',')}`);
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const projects = await response.json();
            return projects;
        } catch (error) {
            console.error('Error fetching projects:', error);
            const errorMessage = error as Error;
            return rejectWithValue(errorMessage.message);
        }
    }
);

const initialState: VolunteerState = {
    projects: [],
    signUps: [],
    loading: false,
    error: null,
};

export const volunteeredSlice = createSlice({
    name: 'volunteered',
    initialState,
    reducers: {
        updateVolunteerStatusLocally: (state, action: PayloadAction<UpdateStatusPayload>) => {
            const { id, newStatus } = action.payload;
            const index = state.signUps.findIndex(signUp => signUp.id === id);
            if (index !== -1) {
                state.signUps[index].status = newStatus;
            }
        },
        deleteVolunteerSignupLocally: (state, action: PayloadAction<string>) => {
            state.signUps = state.signUps.filter(signUp => signUp.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVolunteerSignups.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVolunteerSignups.fulfilled, (state, action) => {
                state.signUps = action.payload;
                state.loading = false;
            })
            .addCase(fetchVolunteerSignups.rejected, (state, action) => {
                state.error = 'Failed to fetch projects';;
                state.loading = false;
            })
            .addCase(fetchProjectsByIds.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectsByIds.fulfilled, (state, action) => {
                state.projects = action.payload;
                state.loading = false;
            })
            .addCase(fetchProjectsByIds.rejected, (state, action) => {
                state.error = 'Failed to fetch projects';;
                state.loading = false;
            });
    }
});

export const { updateVolunteerStatusLocally, deleteVolunteerSignupLocally } = volunteeredSlice.actions;
export default volunteeredSlice.reducer;
