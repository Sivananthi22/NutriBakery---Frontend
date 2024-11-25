import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Use named import

// ProtectedRoute component to check if the user is logged in
const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" />;
  }

  try {
    // Decode the JWT token to get the user's role
    const decodedToken = jwtDecode(token); // Correctly use jwtDecode

    // Check if the user role matches the required role
    if (decodedToken.role !== roleRequired) {
      return <Navigate to="/login" />; // Redirect if role doesn't match
    }

    // If everything is fine, render the protected content
    return children;
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" />; // Redirect if token is invalid or cannot be decoded
  }
};

export default ProtectedRoute;
