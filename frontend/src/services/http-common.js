import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json"
  }
});

// Añadir un interceptor para manejar solicitudes con FormData
api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      // Si la solicitud tiene datos FormData, configura el encabezado adecuadamente
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
