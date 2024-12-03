/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getUserData } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const user = getUserData(); // Get user data from context or localStorage

  if (!user) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (protected routes)
  return children;
};

export default ProtectedRoute;
