import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {SignUpFormData, SignUpFormErrors}  from "../models/SignUpFormData";
import {validateEmail, validateRequired} from "../utils/validationUtils";
import { submitUserData } from "../services/UserService";
import { User } from "../models/User";


export const submitUser = createAsyncThunk(
    'signup/submitUser',
    async (userData: User, { rejectWithValue }) => {
      try {
        await submitUserData(userData); // Assuming submitUserData makes the API call
        return userData; // Returning form data on success
      } catch (error) {
        return rejectWithValue('Failed to submit user data');
      }
    }
);

interface SignUpState {
    formData: SignUpFormData;
    errors: SignUpFormErrors;
    isLoading: boolean;
    user: User | null; 
    generalError?: string;
  }


interface UpdateFieldPayload {
    field: keyof SignUpFormData;
    value: SignUpFormData[keyof SignUpFormData]; 
}

const initialState: SignUpState = {
    formData: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    },
    errors: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    },
    isLoading: false,
    user: null,
    generalError: '',
};

export const signUpFormSlice = createSlice({
    name: 'signUpForm',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
            const { field, value } = action.payload;
            state.formData[field] = value; 
            state.errors[field] = '';

            if (field === 'email') {
                state.errors[field] = validateEmail(value as string);
            } else {
                state.errors[field] = validateRequired(value as string);
            }
        },
        setErrors: (state, action: PayloadAction<Partial<SignUpFormErrors>>) => {
            state.errors = { ...state.errors, ...action.payload };
        },
        validateAllFields: (state) => {
            state.errors.firstName = validateRequired(state.formData.firstName);
            state.errors.lastName = validateRequired(state.formData.lastName);
            state.errors.username = validateRequired(state.formData.username);
            state.errors.email = validateEmail(state.formData.email);
            state.errors.password = validateRequired(state.formData.password);
        },
        resetForm: state => {
            state.formData = initialState.formData;
            state.errors = initialState.errors;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(submitUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(submitUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.errors = { 
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
          };
          state.generalError = ''; 
        })
        .addCase(submitUser.rejected, (state, action) => {
          state.isLoading = false;
          state.generalError = action.payload as string;
        });
    },
});

export const { updateField, setErrors, validateAllFields, resetForm } = signUpFormSlice.actions;
export default signUpFormSlice.reducer
