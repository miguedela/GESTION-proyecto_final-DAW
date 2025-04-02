import axios from "axios";

// Crear una instancia personalizada de axios
const axiosInstance = axios.create({
    baseURL: "/api", // Asegúrate de que esta URL esté configurada correctamente
    headers: {
        "Content-Type": "application/json",
    },
});

// Agregar un interceptor para las solicitudes para que se agregue el token automáticamente
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            // Si el token existe, lo agregamos a las cabeceras
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;