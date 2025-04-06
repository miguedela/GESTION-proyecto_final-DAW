// import useUser from "../../hooks/useUser";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import useUser from "../../hooks/useUser";
import { Footer } from "../../layout/Footer";
import { Header } from "../../layout/Header";
import { ILoginUser } from "../../types/User";

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useUser();
  const [user, setUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const registrationSchema = z.object({
    email: z.string().email({ message: "Correo electronico no válido" }),
    password: z.string().min(4, { message: "Contraseña incorrecta" }),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      registrationSchema.parse({
        ...user,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setFieldErrors(errors);
        return;
      }
    }
    const response = await login(user);

    if (response !== undefined) {
      navigate("/");
    } else {
      setErrorMessage("Error al iniciar sesión");
    }
  };

  return <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-neutral-800 to-amber-600">
    <Header />

    <div className="w-[95%] flex justify-center items-center flex-1">
      <form onSubmit={handleSubmit}
        className="min-md:w-[35rem] flex flex-col gap-2 rounded-lg shadow-2xl p-10 pb-3 bg-gray-100">

        {/* Título del formulario */}
        <h1
          className="text-center text-2xl font-bold"
        >Inicio de sesión
        </h1>

        {/* Campo del correo electronico */}
        <label
          className="flex flex-col ml-3"
          htmlFor="email"
        >Email
        </label>
        <input
          className="border rounded p-1"
          type="text"
          id="email"
          onChange={handleInputChange}
          value={user.email} />
        {fieldErrors.email && <span className="text-red-500">
          {fieldErrors.email}
        </span>}

        {/* Campo de la contraseña */}
        <label className="flex flex-col ml-3" htmlFor="password">Contraseña</label>
        <div className="flex items-center gap-1">
          <input
            className="border rounded p-1 flex-1"
            type={showPassword ? 'text' : 'password'}
            id="password"
            onChange={handleInputChange}
            value={user.password} />
          <button
            className="p-1"
            onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>
        {fieldErrors.password && <span className="text-red-500">{fieldErrors.password}</span>}

        {/* Boton de envio */}
        <input
          type="submit"
          className="cursor-pointer p-2 transition bg-amber-300 hover:bg-amber-500 w-[30%] rounded mt-2"
          value="Registrarse">
          Iniciar sesión
        </input>

        {/* Enlace al login */}
        <p
          className="text-center text-sm mt-3">Si aún no tienes cuenta
          <Link to={"/sign-up"} className="underline transition text-amber-700 hover:text-amber-900">
            registrate
          </Link>
        </p>

        {/* Mensaje de error del back-end */}
        {errorMessage && <span className="text-red-500 text-center">{errorMessage}</span>}
        {/* Mensaje de carga para el registro del nuevo usuario */}
        {loading && <span className="text-white text-center">Registrando cuenta...</span>}

        {/* Mensaje de rror para el desarrollador */}
        {error && <span className="text-red-500 text-center">{error}</span>}
      </form>
    </div>

    <Footer />
  </div>;
}
