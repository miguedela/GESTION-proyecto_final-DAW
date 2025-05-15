import httpClient from "../utils/httpClient";

const urlBase = "/menus";

// Cargar restaurantes con paginación y filtros
export const loadRestaurants = async (restaurantId: string) => {
    return await httpClient({
        url: `${urlBase}/${restaurantId}`,
        method: "GET",
    });
};