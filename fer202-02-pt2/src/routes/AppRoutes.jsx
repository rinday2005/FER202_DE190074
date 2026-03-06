import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';
import Home from '../pages/Home';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
};

export default AppRoutes;
