import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, loggedIn }) => {
    return loggedIn
        ? (
            <element />
        )
        : (
            <Navigate to="/auth" replace />
        );
};
