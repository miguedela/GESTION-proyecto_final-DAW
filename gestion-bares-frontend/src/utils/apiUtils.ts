// Función genérica para manejar llamadas API y errores
export const handleApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
    try {
        const response = await apiCall();
        return response;
    } catch (error) {
        // Manejo del error de manera centralizada
        if (error instanceof Error) {
            throw new Error(error.message);  // Error detallado si es un Error nativo
        } else {
            throw new Error("Error desconocido");  // Error genérico si no es un Error estándar
        }
    }
};