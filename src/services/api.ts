import axios from "axios";

const api = axios.create({
  // ✅ Set baseURL to your deployed backend URL
  baseURL: "https://meal-mate-backend-production.up.railway.app/api",
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
