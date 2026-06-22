import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("ira_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ira_token");
      localStorage.removeItem("ira_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
};

export const userAPI = {
  getProfile: () => API.get("/user/profile"),
  updateProfile: (data) => API.put("/user/profile", data),
  getApplications: () => API.get("/user/applications"),
};

export const applicationAPI = {
  create: (data) => API.post("/apply", data),
  getAll: (params) => API.get("/apply", { params }),
  getById: (id) => API.get(`/apply/${id}`),
  updateStatus: (id, data) => API.patch(`/apply/${id}`, data),
};

export const universityAPI = {
  getAll: (params) => API.get("/universities", { params }),
  getMapData: (params) => API.get("/universities/map", { params }),
  getById: (id) => API.get(`/universities/${id}`),
};

export const countryAPI = {
  getAll: () => API.get("/countries"),
  getByName: (name) => API.get(`/countries/${name}`),
};

export const contactAPI = {
  send: (data) => API.post("/contact", data),
};

export default API;
