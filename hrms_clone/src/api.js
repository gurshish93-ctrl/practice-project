import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for a 401 error and ensure we have a response object
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've tried to refresh

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          // If no refresh token, logout
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Request a new access token
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken,
        });

        const { access } = response.data;

        // Store the new token
        localStorage.setItem('access_token', access);

        // Update the header for the original request and retry
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return api(originalRequest);

      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  }
);

export default api;
