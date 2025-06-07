import queryString from "query-string";
import httpClient from "../utils/httpClient";

const urlBase = "/restaurants-staff";

// Asignar un restaurante a un staff
export const addStaffToRestaurant = async (staffId: string, restaurantId: string) => {
    return await httpClient({
        url: `${urlBase}`,
        method: "POST",
        params: {
            staffId,
            restaurantId,
        },
        paramsSerializer: (params: Record<string, unknown>): string => {
            return queryString.stringify(params, { arrayFormat: "comma" });
        },
    });
};

// Desasignar un restaurante de un staff
export const deleteRestaurantStaff = async (restaurantStaffId: string) => {
    return await httpClient({
        url: `${urlBase}/${restaurantStaffId}`,
        method: "DELETE",
    });
};

// Obtener todos los restaurantes de un staff
export const getRestaurantsByStaff = async (staffId: string) => {
    return await httpClient({
        url: `${urlBase}/staff/${staffId}`,
        method: "GET",
        params: {
            staffId,
        },
        paramsSerializer: (params: Record<string, unknown>): string => {
            return queryString.stringify(params, { arrayFormat: "comma" });
        },
    });
};

// Obtener todos los staff asignados a un restaurante
export const getStaffByRestaurant = async (restaurantId: string) => {
    return await httpClient({
        url: `${urlBase}/restaurant`,
        method: "GET",
        params: {
            restaurantId,
        },
        paramsSerializer: (params: Record<string, unknown>): string => {
            return queryString.stringify(params, { arrayFormat: "comma" });
        },
    });
};

// Devolver todas las asignaciones
export const getAllRestaurantStaff = async () => {
    return await httpClient({
        url: `${urlBase}/all`,
        method: "GET",
    });
};