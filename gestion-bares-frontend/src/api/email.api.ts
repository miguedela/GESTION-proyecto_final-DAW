import queryString from "query-string";
import httpClient from "../utils/httpClient";

const urlBase = "/email";

// Enviar correo para cambiar contraseña
export const sendEmailChangePassword = async (emailTo: string) => {
    return await httpClient<string>({
        url: `${urlBase}/reset-password`,
        method: "GET",
        params: {
            emailTo
        },
        paramsSerializer: (params: Record<string, unknown>): string => {
            return queryString.stringify(params, { arrayFormat: "comma" });
        },
    });
}