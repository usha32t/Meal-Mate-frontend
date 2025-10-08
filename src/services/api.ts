import axios from "axios";

// ✅ Base URL points to your Railway backend
const api = axios.create({
  baseURL: "https://meal-mate-backend-production.up.railway.app", // Railway backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
