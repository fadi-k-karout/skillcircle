import axios from 'axios';


// Create a base Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_URL, // Set your API base URL
});

// Function to get token (e.g., from local storage or state management)
const getToken = () => localStorage.getItem('jwtToken') || ''; // Modify this based on your token storage strategy

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle error
    return Promise.reject(error);
  }
);

export default axiosInstance;
