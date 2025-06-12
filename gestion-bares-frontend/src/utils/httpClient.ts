import axios from "axios";
import queryString from "query-string";

// const httpClient = axios.create({
//   baseURL: "http://localhost:8080/api",
//   paramsSerializer: (params) =>
//     queryString.stringify(params, { arrayFormat: "comma" }),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const httpClient = axios.create({
  baseURL: "/api",
  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: "comma" }),
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isPublicEndpoint =
    config.url?.includes("/auth") || config.url?.includes("/public");

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default httpClient;
