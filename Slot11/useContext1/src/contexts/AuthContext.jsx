import React, { createContext, useReducer, useContext } from 'react';
import { mockAccounts } from '../data/mockAccounts';

// 1. Khởi tạo AuthContext
export const AuthContext = createContext({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    clearError: () => { }
});

// 2. Định nghĩa reducer cho Auth
const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: true,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false
            };
        case 'LOGOUT':
            return initialState;
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// 3. Tạo AuthProvider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Hàm Login
    const login = async (identifier, password) => {
        dispatch({ type: 'LOGIN_START' });

        try {
            // Giả lập delay mạng
            await new Promise(resolve => setTimeout(resolve, 800));

            const account = mockAccounts.find(
                (acc) => (acc.username === identifier || acc.email === identifier) && acc.password === password
            );

            if (!account) {
                const errorMsg = 'Tài khoản hoặc mật khẩu không chính xác!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMsg });
                return { ok: false, error: errorMsg };
            }

            if (account.status !== 'active') {
                const errorMsg = 'Tài khoản đã bị khóa!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMsg });
                return { ok: false, error: errorMsg };
            }

            // Yêu cầu: "Phân quyền admin mới được phép đăng nhập"
            if (account.role !== 'admin') {
                const errorMsg = 'Bạn không có quyền truy cập (Yêu cầu quyền Admin)!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMsg });
                return { ok: false, error: errorMsg };
            }

            dispatch({ type: 'LOGIN_SUCCESS', payload: account });
            return { ok: true, user: account };
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
            return { ok: false, error: err.message };
        }
    };

    // Hàm Logout
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    // Hàm xóa lỗi
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const contextValue = {
        user: state.user,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        clearError
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Custom hook useAuth
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
