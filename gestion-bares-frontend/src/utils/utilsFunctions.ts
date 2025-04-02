export const setMessageError = (error: unknown, setError: (errorMessage: string) => void) => {
    if (error instanceof Error) {
        setError(error.message);
    } else {
        setError("Un error no conocido ha sucedidok.");
    }
    return null;
};