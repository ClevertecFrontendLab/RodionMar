import axios from "axios";

// ===== main instance =====
const $api = axios.create({
  baseURL: "https://marathon-api.clevertec.ru",
  headers: {
    "Content-Type": "application/json",
  },
});


// ===== set token =====
$api.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default $api;
