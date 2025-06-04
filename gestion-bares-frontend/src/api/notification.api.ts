import { INotification } from "../types/Notification";
import httpClient from "../utils/httpClient";

const urlBase = "/notifications";

// Crear una nueva notificación
export const createNotification = async (notification: INotification) => {
    return await httpClient({
        url: `${urlBase}`,
        method: "POST",
        data: notification,
    });
};

// Eliminar una notificación
export const deleteNotification = async (notificationId: string) => {
    return await httpClient({
        url: `${urlBase}/${notificationId}`,
        method: "DELETE",
    });
};

// Editar una notificación
export const updateNotification = async (notification: INotification) => {
    return await httpClient({
        url: `${urlBase}/${notification.id}`,
        method: "PUT",
        data: notification,
    });
};

// Obtener una notificación por ID
export const getNotificationById = async (notificationId: string) => {
    return await httpClient({
        url: `${urlBase}/${notificationId}`,
        method: "GET",
    });
};

// Cargar notificaciones de un usuario específico
export const loadNotificationsByReceiver = async (userId: string) => {
    return await httpClient({
        url: `${urlBase}/user/${userId}`,
        method: "GET",
    });
};

// Cargar notificaciones de un restaurante específico
export const loadNotificationsBySender = async (restaurantId: string) => {
    return await httpClient({
        url: `${urlBase}/restaurant/${restaurantId}`,
        method: "GET",
    });
};