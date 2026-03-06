import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/users?username=${username}&password=${password}`);
            const user = response.data[0];
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            } else {
                return rejectWithValue('Invalid username or password');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
