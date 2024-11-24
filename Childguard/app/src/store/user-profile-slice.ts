import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/User';  // Adjust the import path as necessary
import { updateUserData } from '../services/UserService';
import { validateEmail, validateRequired } from '../utils/validationUtils';

interface UserProfileFormData {
    fullname: string;
    email: string;
}

interface UserProfileState {
    user: User | null;
    formData: UserProfileFormData;
    errors: {
        fullname: string;
        email: string;
    };
    isLoading: boolean;
    isEditMode: boolean;
    error: string | null;
}

interface UpdateFieldPayload {
    field: keyof UserProfileFormData;
    value: UserProfileFormData[keyof UserProfileFormData]; 
}

// Initial state set with null/empty values initially
const initialState: UserProfileState = {
    user: null,
    formData: {
        fullname: '',
        email: '',
    },
    errors: {
        fullname: '',
        email: '',
    },
    isLoading: false,
    isEditMode: false,
    error: null,
};

export const saveUser = createAsyncThunk(
    'userProfile/saveUser',
    async (data: { userId: string; fullname: string; email: string }, { rejectWithValue }) => {
        try {
            const userData = await updateUserData(data.userId, { fullname: data.fullname, email: data.email });
            return userData;
        } catch (error) {
            return rejectWithValue('Failed to update user data');
        }
    }
);

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.formData.fullname = action.payload.fullname;
            state.formData.email = action.payload.email;
        },
        toggleEditMode: (state) => {
            state.isEditMode = !state.isEditMode;
        },
        updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
            const { field, value } = action.payload;
            state.formData[field] = value;
            // Reset and validate field
            state.errors[field] = '';
            if (field === 'email') {
                state.errors[field] = validateEmail(value);
            } else if (field === 'fullname') {
                state.errors[field] = validateRequired(value);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isEditMode = false;
                state.error = null;
            })
            .addCase(saveUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setUser, toggleEditMode, updateField } = userProfileSlice.actions;
export default userProfileSlice.reducer;
