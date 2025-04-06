import queryString from "query-string";
import { ILoginResponse, ILoginUser, IRegisterUser } from "../types/User";
import httpClient from "../utils/httpClient";

const urlBase = "/users";

// Registro de usuario
export const registerUser = async (user: IRegisterUser) => {
  return await httpClient({
    url: `${urlBase}/auth/register`,
    method: "POST",
    data: user,
  });
};

// Login de usuario, especificando la respuesta como ILoginResponse
export const loginUser = async (user: ILoginUser) => {
  return await httpClient<ILoginResponse>({
    url: `${urlBase}/auth/login`,
    method: "POST",
    data: user,
  });
};

// Obtener perfil del usuario actual
export const getMyProfile = async () => {
  return await httpClient({
    url: `${urlBase}/profile`,
    method: "GET",
  });
};

// Cargar usuarios con paginación y filtros
export const loadUsers = async (page: number, size: number, filters?: Record<string, string | number | boolean>) => {
  return await httpClient({
    url: `${urlBase}/admin/users`,
    method: "GET",
    params: {
      page,
      size,
      ...filters,
    },
    paramsSerializer: (params: Record<string, unknown>): string => {
      return queryString.stringify(params, { arrayFormat: "comma" });
    },
  });
};

// Cargar un usuario específico
export const loadUser = async (userId: string) => {
  return await httpClient({
    url: `${urlBase}/admin/${userId}`,
    method: "GET",
  });
};

// Eliminar un usuario
export const deleteUser = async (userId: string) => {
  return await httpClient({
    url: `${urlBase}/admin/${userId}`,
    method: "DELETE",
  });
};
