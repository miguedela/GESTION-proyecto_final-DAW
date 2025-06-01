import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, loginUser, registerUser, updateMyProfile } from "../api/users.api";
import { userAtom } from "../atoms/user.atom";
import { showErrorToast, showSuccessToast } from "../components/ToastUtils";
import { ILoginUser, IRegisterUser, IUser } from "../types/User";
import { setMessageError } from "../utils/utilsFunctions";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const saveUserToStorage = (userData: IUser, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [setUser]);

  const register = async (userData: IRegisterUser) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);
      saveUserToStorage(response.data.user, response.data.token);
      setLoading(false);
      showSuccessToast("Registro exitoso. Bienvenido!");
      return response;
    } catch (err: unknown) {
      setMessageError(err, setError);
      showErrorToast("Error al registrar el usuario. Por favor, inténtalo de nuevo.");
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
      showSuccessToast("Inicio de sesión exitoso.");
      return response;
    } catch (err: unknown) {
      setMessageError(err, setError);
      showErrorToast("Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await getMyProfile();
      saveUserToStorage(response.data, token);
      showSuccessToast("Perfil obtenido correctamente.");
      return response;
    } catch (err: unknown) {
      setMessageError(err, setError);
      showErrorToast("Error al obtener el perfil. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    showSuccessToast("Has cerrado sesión correctamente.");
    navigate("/");
  };

  const updateProfile = async (userData: IUser, currentPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateMyProfile(userData, currentPassword);
      saveUserToStorage(response.data.user, response.data.token);
      showSuccessToast("Perfil actualizado correctamente.");
      return response;
    } catch (error: unknown) {
      setMessageError(error, setError)
      showErrorToast("Error al actualizar el perfil. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    user,
    loading,
    error
  };
};

export default useAuth;
