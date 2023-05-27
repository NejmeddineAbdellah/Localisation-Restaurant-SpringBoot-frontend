import React from 'react';
import { Outlet, Navigate } from 'react-router';

// Example function to check if the user is authenticated
const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.accessToken;
};

const ProtectedRoute = () => {
  
   return isAuthenticated() ?  <Outlet/> :   <Navigate to="/"  />;
   
}

export default ProtectedRoute;
