import { IDish } from "../types/Dish";
import httpClient from "../utils/httpClient";

const urlBase = "/dishes";

// Cargar restaurantes con paginación y filtros
export const createDish = async (menuId: string, dish: IDish) => {
    return await httpClient({
        url: `${urlBase}/${menuId}`,
        method: "POST",
        data: dish,
    });
};

// Crear un nuevo restaurante
export const updateDish = async (dish: IDish) => {
    return await httpClient({
        url: `${urlBase}`,
        method: "PUT",
        data: dish,
    });
};

// Eliminar un restaurante
export const deleteDish = async (dishId: string) => {
    return await httpClient({
        url: `${urlBase}/${dishId}`,
        method: "DELETE",
    });
};

// Obtener un plato por ID
export const getDishById = async (dishId: string) => {
    return await httpClient({
        url: `${urlBase}/${dishId}`,
        method: "GET",
    });
};