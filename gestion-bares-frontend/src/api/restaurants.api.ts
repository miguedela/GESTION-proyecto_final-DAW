import queryString from "query-string";
import httpClient from "../utils/httpClient";

const urlBase = "/restaurants";

// Cargar restaurantes con paginación y filtros
export const loadRestaurants = async (page: number, size: number, filters?: Record<string, string | number | boolean>) => {
    return await httpClient({
        url: `${urlBase}`,
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