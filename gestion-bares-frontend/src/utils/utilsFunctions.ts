import { AxiosError } from "axios";

export const setMessageError = (err: unknown, setError: (errorMessage: string) => void) => {
  if (err instanceof AxiosError) {
    if (err.response && err.response.data) {
      const errorMessage = err.response.data.message || "Ocurrió un error desconocido";
      setError(errorMessage);
    } else {
      setError("Error desconocido");
    }
  } else if (err instanceof Error) setError(err.message);
  else setError("An unknown error occurred");
};
