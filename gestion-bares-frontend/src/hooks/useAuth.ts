import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getMyProfile, loginUser, registerUser } from "../api/users.api";
import { userAtom } from "../atoms/user.atom";
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
      return response;
    } catch (err: unknown) {
      setMessageError(err, setError);
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
    } catch (err: unknown) {
      setMessageError(err, setError);
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
      return response;
    } catch (err: unknown) {
      setMessageError(err, setError);
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

  return { register, login, logout, getProfile, removeUser: deleteUser, loading, error, user };
};

export default useAuth;
