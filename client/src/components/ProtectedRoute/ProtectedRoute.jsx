import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';

export const ProtectedRoute = () => {
    const currentUser = useContext(CurrentUserContext)
    console.log(currentUser.isLoggedIn);
    return currentUser.isLoggedIn ? (
        <Outlet />
    )
        : (
            <Navigate to="/auth" replace />
        );
};