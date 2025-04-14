import React from 'react';
import { Navigate } from 'react-router-dom';

// This component will check if the user is authenticated and has the correct role
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('userRole'); // Replace with your auth logic (e.g., context or token)
  
  console.log('User Role:', userRole); // Debugging line to check role

  if (!userRole) {
    // If no user is logged in, redirect to login
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    // If the role doesn't match, redirect to appropriate dashboard
    console.log('Redirecting to dashboard based on role'); // Debugging line
    return <Navigate to={userRole === 'admin' ? '/admin' : '/user'} />;
  }

  return children; // Render the protected route if everything is okay
};

export default ProtectedRoute;
