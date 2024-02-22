import axios from "axios";

// ===== main instance =====
const $api = axios.create({
  baseURL: "https://marathon-api.clevertec.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default $api;
