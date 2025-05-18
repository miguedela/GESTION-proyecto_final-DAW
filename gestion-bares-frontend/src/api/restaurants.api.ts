import queryString from "query-string";
import { IRestaurant } from "../types/Restaurants";
import httpClient from "../utils/httpClient";
import { IUser } from "../types/User";

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

// Crear un nuevo restaurante
export const registerRestaurant = async (restaurant: IRestaurant) => {
    return await httpClient({
        url: `${urlBase}`,
        method: "POST",
        data: restaurant,
    });
};

// Eliminar un restaurante
export const deleteRestaurant = async (userId: string) => {
    return await httpClient({
        url: `${urlBase}/${userId}`,
        method: "DELETE",
    });
};

// Editar un restaurante
export const updateRestaurant = async (user: IUser, restaurant: IRestaurant) => {
    return await httpClient({
        url: `${urlBase}/${user.id}`,
        method: "PUT",
        data: restaurant
    });
};

// Cargar un restaurante específico
export const loadRestaurant = async (restaurantId: string) => {
    return await httpClient({
        url: `${urlBase}/${restaurantId}`,
        method: "GET",
    });
};