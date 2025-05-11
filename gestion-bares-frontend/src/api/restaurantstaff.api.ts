import queryString from "query-string";
import httpClient from "../utils/httpClient";

const urlBase = "/restaurants-staff";

// Obtener todos los restaurantes de un staff
export const getRestaurantsByStaff = async (staffId: string) => {
    return await httpClient({
        url: `${urlBase}`,
        method: "GET",
        params: {
            staffId,
        },
        paramsSerializer: (params: Record<string, unknown>): string => {
            return queryString.stringify(params, { arrayFormat: "comma" });
        },
    });
};

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