import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getMyProfile, loginUser, registerUser } from "../api/user.api";
import { userAtom } from "../atoms/user.atom";
import { ILoginUser, IRegisterUser, IUser } from "../types/User";
import { setMessageError } from "../utils/utilsFunctions";

const useUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const saveUserToStorage = (userDate: IUser, token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userDate));
        setUser(userDate);
    };

    const register = async (userData: IRegisterUser) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerUser(userData);
            saveUserToStorage(response.data.user, response.data.token);
            return response;
        } catch (error: unknown) {
            setMessageError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData: ILoginUser) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginUser(userData);
            saveUserToStorage(response.data.user, response.data.token);
            return response;
        } catch (error: unknown) {
            setMessageError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    const getProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token no encontrado");

            const response = await getMyProfile();
            saveUserToStorage(response.data, token);
            return response;
        } catch (error: unknown) {
            setMessageError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return {
        register,
        login,
        logout,
        getProfile,
        removeUser: deleteUser,
        loading,
        error,
        user,
    };
};

export default useUser;

