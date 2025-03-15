import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Declare base URL
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Intercept any requests and add auth headers onto it
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
