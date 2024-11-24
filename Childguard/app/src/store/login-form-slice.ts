import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  { LoginFormFields, LoginFormErrors, UpdateFieldPayload } from '../models/logInFormData';
import { validateEmail, validateRequired } from '../utils/validationUtils';
import { User } from '../models/User';
import { loginUserData } from '../services/UserService';

export const loginUser = createAsyncThunk(
    'login/userLogin',
    async ({ email, password }: LoginFormFields, { rejectWithValue }) => {
      try {
        const userData = await loginUserData({email, password}); 
        return userData; 
      } catch (error) {
        const message = (error as Error).message;
        return rejectWithValue(message || 'Failed to submit user data');
      }
  }
);

interface LoginState {
  formData: LoginFormFields;
  errors: LoginFormErrors;
  isLoading: boolean;
  user: User | null; 
  generalError?: string;  
}

const initialState: LoginState = {
    formData: {
      email: '',
      password: '',
    },
    errors: {
      email: '',
      password: '',
    },
    isLoading: false,
    user: null,
    generalError: '', 
  };
  
export const loginFormSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
        const { field, value } = action.payload;
        state.formData[field] = value;  // Update the formData
        // Reset error for the updated field
        state.errors[field] = '';
  
        // Apply validation
        if (field === 'email') {
          state.errors[field] = validateEmail(value);
        } else if (field === 'password') {
          state.errors[field] = validateRequired(value);
        }
      },
      validateAllFields: (state) => {
        state.errors.email = validateEmail(state.formData.email);
        state.errors.password = validateRequired(state.formData.password);
    },
      setErrors: (state, action: PayloadAction<LoginFormErrors>) => {
        state.errors = action.payload;
      },
        logout: (state) => {
            state.formData = initialState.formData;
            state.errors = initialState.errors;
            state.isLoading = false;
            state.user = null;
            state.generalError = '';
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.errors = { email: '', password: '' }; 
            state.generalError = '';  
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.generalError = action.payload as string; 
          });
      }
  });
  
export const { updateField, setErrors, validateAllFields, logout } = loginFormSlice.actions;

export default loginFormSlice.reducer;