import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanagerapp-jutv.onrender.com",
});

// Optional: Set auth token for protected routes
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
