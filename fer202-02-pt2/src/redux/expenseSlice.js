import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchExpenses = createAsyncThunk(
    'expenses/fetchExpenses',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get('/expenses');
            // Lọc dữ liệu tại Frontend để đảm bảo khớp kiểu dữ liệu (chuỗi/số)
            return response.data.filter(item => String(item.userId) === String(userId));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addExpense = createAsyncThunk(
    'expenses/addExpense',
    async (expense, { rejectWithValue }) => {
        try {
            const response = await api.post('/expenses', expense);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateExpense = createAsyncThunk(
    'expenses/updateExpense',
    async (expense, { rejectWithValue }) => {
        try {
            const response = await api.put(`/expenses/${expense.id}`, expense);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteExpense = createAsyncThunk(
    'expenses/deleteExpense',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/expenses/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    filterCategory: '',
    loading: false,
    error: null,
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload;
        },
        clearExpenseError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export const { setFilterCategory, clearExpenseError } = expenseSlice.actions;
export default expenseSlice.reducer;
