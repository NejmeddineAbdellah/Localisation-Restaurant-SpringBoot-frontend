import React from 'react';
import { Outlet, Navigate } from 'react-router';
import AuthService from "../../services/auth.service";

// Example function to check if the user is authenticated
const isAuthenticated = () => {
    const user = AuthService.getCurrentUser();
  return user.roles.includes("ROLE_MODERATOR")||user.roles.includes("ROLE_ADMIN");
};

const ModeratorRoute = () => {
  
   return isAuthenticated() ?  <Outlet/> :   <Navigate to="/NotFoundPage"  />;
   
}

export default ModeratorRoute;