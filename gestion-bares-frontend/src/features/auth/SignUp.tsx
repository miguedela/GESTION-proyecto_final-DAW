// import useUser from "../../hooks/useUser";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import useUser from "../../hooks/useUser";
import { Footer } from "../../layout/Footer";
import { Header } from "../../layout/Header";
import { IRegisterUser, Roles } from "../../types/User";

export const SignUp = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useUser();
  const [user, setUser] = useState<IRegisterUser>({
    name: "",
    surnames: "",
    email: "",
    telephone: "",
    password: "",
    role: Roles.CUSTOMER,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passworRepeat, setPassworRepeat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const registrationSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    surnames: z.string().min(1, { message: "Los apellidos son obligatorios" }),
    email: z.string().email({ message: "El email no es válido" }),
    telephone: z.string().min(9, { message: "El teléfono no es válido" }).max(9, { message: "El teléfono no es válido" }),
    password: z.string().min(4, { message: "La contraseña es obligatoria" }),
    repeatPassword: z.string().min(4, { message: "La contraseña es obligatoria" })
  }).refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"]
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
        repeatPassword: passworRepeat,
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
    const response = await register(user);

    if (response !== undefined) {
      navigate("/");
    } else {
      setErrorMessage("Error al registrarse");
    }
  };

  return <div
    className="min-w-screen flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-neutral-800 to-amber-600">
    <Header />

    <div className="w-[95%] flex justify-center items-center flex-1">
      <form onSubmit={handleSubmit}
        className="min-sm:w-[35rem] flex flex-col gap-2 rounded-lg shadow-2xl p-10 pb-3 bg-gray-100">

        {/* Título del formulario */}
        <h1
          className="text-center text-2xl font-bold"
        >Registro
        </h1>

        {/* Campo del nombre */}
        <label
          className="flex flex-col ml-3"
          htmlFor="name"
        >Nombre
        </label>
        <input
          className="border rounded p-1"
          id="name"
          type="text"
          onChange={handleInputChange}
          value={user.name} />
        {fieldErrors.name && <span className="text-red-500">{fieldErrors.name}</span>}

        {/* Campo de los apellidos */}
        <label
          className="flex flex-col ml-3"
          htmlFor="surnames"
        >Apellidos
        </label>
        <input
          className="border rounded p-1"
          id="surnames"
          type="text"
          onChange={handleInputChange}
          value={user.surnames} />
        {fieldErrors.surnames && <span className="text-red-500">
          {fieldErrors.surnames}
        </span>}

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
          value={user.email} />
        {fieldErrors.email && <span className="text-red-500">
          {fieldErrors.email}
        </span>}

        {/* Campo del telefono */}
        <label
          className="flex flex-col ml-3"
          htmlFor="telephone"
        >Teléfono
        </label>
        <input
          className="border rounded p-1"
          id="telephone"
          type="text"
          onChange={handleInputChange}
          value={user.telephone} />
        {fieldErrors.telephone && <span className="text-red-500">
          {fieldErrors.telephone}
        </span>}

        {/* Campo de la contraseña */}
        <label className="flex flex-col ml-3" htmlFor="password">Contraseña</label>
        <div
          className="flex items-center gap-1">
          <input
            className="border rounded p-1 flex-1"
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleInputChange}
            value={user.password} />
          <button
            className="p-1"
            onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>
        {fieldErrors.password && <span className="text-red-500">{fieldErrors.password}</span>}

        {/* Campo de la contraseña repetida */}
        <label
          className="flex flex-col ml-3"
          htmlFor="repeatPassword"
        >Repetir contraseña
        </label>
        <input
          className="border rounded p-1"
          id="repeatPassword"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassworRepeat(e.target.value)}
          value={passworRepeat} />
        {fieldErrors.repeatPassword && <span className="text-red-500">{fieldErrors.repeatPassword}</span>}

        {/* Boton de envio */}
        <input
          type="submit"
          className="cursor-pointer p-2 transition bg-amber-300 hover:bg-amber-500 w-[30%] rounded mt-2"
          value="Registrarse">
          Registrarse
        </input>

        {/* Enlace al login */}
        <p
          className="text-center text-sm mt-3">Si ya tiene cuenta
          <Link
            to={"/login"}
            className="underline transition text-amber-700 hover:text-amber-900">
            iniciar sesión
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
