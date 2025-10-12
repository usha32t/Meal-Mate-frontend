import axios from "axios";

// ✅ Axios instance pointing to deployed backend root
const api = axios.create({
  baseURL: "https://meal-mate-backend-production.up.railway.app", // backend root
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
