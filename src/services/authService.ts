// src/services/authService.ts
import axiosInstance from '../api/axiosInstance';

const TOKEN_KEY = 'jwtToken';

export const authService = {
  // Login function to authenticate user and store token
  login: async (email: string, password: string): Promise<string> => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setAuthToken(token); // Set axios default header
    }
    return token;
  },

  // Logout function to clear token
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthToken(null);
  },

  // Helper to get token
  getToken: () => localStorage.getItem(TOKEN_KEY),
};

// Axios header helper to set/remove Authorization header
const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Initialize token on app load, if it exists
setAuthToken(authService.getToken());
