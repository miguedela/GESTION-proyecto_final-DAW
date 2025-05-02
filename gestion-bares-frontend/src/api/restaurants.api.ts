import queryString from "query-string";
import httpClient from "../utils/httpClient";
import { IRestaurant } from "../types/Restaurants";

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
export const updateRestaurant = async (restaurant: IRestaurant) => {
    return await httpClient({
        url: `${urlBase}/update/${restaurant.id}`,
        method: "PUT",
        data: restaurant,
    });
};

// Cargar un restaurante específico
export const loadRestaurant = async (userId: string) => {
    return await httpClient({
      url: `${urlBase}/${userId}`,
      method: "GET",
    });
  };