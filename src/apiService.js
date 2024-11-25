// src/Components/apiService.js
import api from '../api/api'; // Adjusted path for api import

// User services
export const signup = async (userData) => api.post('/users/signup', userData);
export const login = async (userData) => api.post('/users/login', userData);
export const forgotPassword = async (email) => api.post('/users/forgot-password', { email });
export const resetPassword = async (resetToken, newPassword) => api.post('/users/reset-password', { resetToken, newPassword });
export const verifyEmail = async (token) => api.get(`/users/verify-email/${token}`);
export const verifyPhone = async (userID, otp) => api.post('/users/verify-phone', { userID, otp });
