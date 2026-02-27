import React, { createContext, useReducer, useContext } from 'react';
import movieApi from '../api/movieAPI';

// 1. Initial State
const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

// 2. Reducer
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, user: action.payload, isAuthenticated: true, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.payload, isAuthenticated: false };
        case 'LOGOUT':
            return initialState;
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
}

// 3. Context
export const AuthContext = createContext(null);

// 4. Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (identifier, password) => {
        dispatch({ type: 'LOGIN_START' });

        try {
            // Fetch users from db.json via API
            const response = await movieApi.get('/accounts');
            const accounts = response.data;

            console.log("DEBUG - Input identifier:", identifier);
            console.log("DEBUG - Input password:", password);
            console.log("DEBUG - Password length:", password.length);

            // Find account by username OR email and verify password
            const account = accounts.find(
                (acc) => (acc.username.toLowerCase() === identifier.trim().toLowerCase() ||
                    acc.email.toLowerCase() === identifier.trim().toLowerCase()) &&
                    acc.password === password.trim()
            );

            console.log("DEBUG - Account found:", account ? "Yes" : "No");

            if (!account) {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: 'Tài khoản hoặc mật khẩu không chính xác!'
                });
                return { ok: false };
            }

            if (account.status !== 'active') {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: 'Tài khoản đã bị khóa!'
                });
                return { ok: false };
            }

            if (account.role !== 'admin') {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: 'Bạn không có quyền truy cập (Yêu cầu quyền Admin)!'
                });
                return { ok: false };
            }

            dispatch({ type: 'LOGIN_SUCCESS', payload: account });
            return { ok: true };

        } catch (error) {
            console.error("LOGIN ERROR:", error);
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: 'Lỗi kết nối đến server!'
            });
            return { ok: false };
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
