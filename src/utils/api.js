import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://linkedin-clone-server-five.vercel.app/api/v1",
});

// Log the API URL being used for debugging
console.log('API URL:', process.env.REACT_APP_API_URL || "https://linkedin-clone-server-five.vercel.app/api/v1");

// Add request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
