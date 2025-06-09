import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { MainButton } from "../../components/Buttons";
import { Input } from "../../components/Forms";
import useAuth from "../../hooks/useAuth";
import { Loading } from "../../layouts/Loading";
import { IRegisterUser, Roles } from "../../types/User";

export const SignUp = () => {
    const [user, setUser] = useState<IRegisterUser>({
        name: '',
        surnames: '',
        email: '',
        telephone: '',
        password: '',
        role: Roles.CUSTOMER
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const registrationSchema = z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        surnames: z.string().min(1, "Los apellidos son obligatorios"),
        email: z.string().email("El correo electrónico no es válido"),
        phone: z.number().min(100000000, "El teléfono no es válido").max(999999999, "El teléfono no es válido"),
        password: z.string().min(1, "La contraseña debe tener al menos 6 caracteres"),
        confirmPassword: z.string().min(1, "La contraseña debe tener al menos 6 caracteres"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
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
        setFieldErrors({});

        try {
            registrationSchema.parse({
                ...user,
                confirmPassword,
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
        if (response)
            navigate('/account');
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/account');
        }
    }, [navigate]);


    return <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl px-8 py-10 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
            <h1 className="text-3xl font-extrabold text-center text-amber-700 drop-shadow-sm tracking-tight mb-6">
                Nueva Cuenta
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                <Input
                    label="Nombre"
                    id="name"
                    value={user.name}
                    onChange={handleInputChange}
                    fieldErrors={fieldErrors.name}
                />
                <Input
                    label="Apellidos"
                    id="surnames"
                    value={user.surnames}
                    onChange={handleInputChange}
                    fieldErrors={fieldErrors.surnames}
                />
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    fieldErrors={fieldErrors.email}
                />
                <Input
                    label="Teléfono"
                    id="telephone"
                    type="tel"
                    value={user.telephone}
                    onChange={handleInputChange}
                    fieldErrors={fieldErrors.telephone}
                />
                <Input
                    label="Contraseña"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={handleInputChange}
                    fieldErrors={fieldErrors.password}
                />
                <Input
                    label="Repetir contraseña"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fieldErrors={fieldErrors.confirmPassword}
                />

                {error && (
                    <p className="md:col-span-2 text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}
                {loading && (
                    <div className="md:col-span-2 flex justify-center">
                        <Loading />
                    </div>
                )}

                <div className="md:col-span-2">
                    <MainButton
                        text="Crear"
                        type="submit"
                        className="w-full"
                    />
                </div>
            </form>

            <div className="flex flex-col gap-2 text-sm text-center text-slate-600 mt-6">
                <span>
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        to="/login"
                        className="text-amber-600 underline underline-offset-4 hover:text-amber-500"
                    >
                        Iniciar sesión
                    </Link>
                </span>
                <Link
                    to="/"
                    className="text-amber-600 underline underline-offset-4 text-xs hover:text-amber-500"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    </div>
}
