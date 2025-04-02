import { ILoginResponse, ILoginUser, IRegisterUser } from "../types/User";
import { handleApiCall } from "../utils/apiUtils";
import axiosInstance from "../utils/axiosInstance";

const urlBase = "/users";

// Registrar usuario
export const registerUser = async (user: IRegisterUser) => {
    return handleApiCall(() => axiosInstance.post(`${urlBase}/auth/register`, user));
};

// Iniciar sesión en cuenta de usuario
export const loginUser = async (user: ILoginUser) => {
    return handleApiCall(() => axiosInstance.post<ILoginResponse>(`${urlBase}/auth/login`, user));
};

// Obtener perfil de usuario logueado
export const getMyProfile = async () => {
    return handleApiCall(() => axiosInstance.get(`${urlBase}/profile`));
};

// Eliminar usuario
export const deleteUser = async (userId: number) => {
    return handleApiCall(() => axiosInstance.delete(`${urlBase}/admin/${userId}`));
};