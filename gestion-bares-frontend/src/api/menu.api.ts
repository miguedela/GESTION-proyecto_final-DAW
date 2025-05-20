import { IMenu } from "../types/Menu";
import httpClient from "../utils/httpClient";

const urlBase = "/menus";

// Cargar restaurantes con paginación y filtros
export const loadMenu = async (restaurantId: string) => {
    return await httpClient<IMenu>({
        url: `${urlBase}/${restaurantId}`,
        method: "GET",
    });
};