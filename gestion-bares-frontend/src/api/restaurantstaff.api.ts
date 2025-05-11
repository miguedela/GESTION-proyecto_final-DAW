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