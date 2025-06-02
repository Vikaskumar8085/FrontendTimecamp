import axios from "axios";
const apiInstance = axios.create({baseURL: "http://localhost:8000/api"});

apiInstance.interceptors.request.use(
  (config) => {
    const getToken = JSON.parse(localStorage.getItem("token"));
    if (getToken) {
      config.headers.Authorization = `Bearer ${getToken}`;
    }
    return config;
  },
  (error) => {
    new Promise.reject(error.message);
  }
);

export default apiInstance;
