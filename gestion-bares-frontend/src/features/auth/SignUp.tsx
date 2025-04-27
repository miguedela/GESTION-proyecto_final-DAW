import { useState } from "react";
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
        telephone: z.string().min(1, "El teléfono no es válido"),
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

    return <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-900  to-blue-950 text-neutral-100">
        <div className="px-20 py-10 bg-neutral-800 rounded-lg shadow-lg">
            <h1 className="text-4xl">Nueva Cuenta</h1>

            <div className="my-20 flex flex-col gap-5">
                <form onSubmit={handleSubmit}>
                    <Input label="Nombre"
                        id="name"
                        value={user.name}
                        onChange={handleInputChange}
                        fieldErrors={fieldErrors.name}
                    />
                    <Input label="Apellidos"
                        id="surnames"
                        value={user.surnames}
                        onChange={handleInputChange}
                        fieldErrors={fieldErrors.surnames}
                    />
                    <Input label="Email"
                        id="email"
                        value={user.email}
                        type="email"
                        onChange={handleInputChange}
                        fieldErrors={fieldErrors.email}
                    />
                    <Input label="Teléfono"
                        id="telephone"
                        value={user.telephone}
                        type="tel"
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

                    {error && <p className="text-red-500">{error}</p>}
                    {loading && <Loading />}

                    <div className='mt-10 flex gap-5 items-center'>
                        <MainButton text='Crear cuenta' type='submit' />
                        <div>
                            <p className="text-sm text-neutral-400">¿Ya tienes una cuenta?</p>
                            <Link to="/login" className="text-amber-500 underline">Iniciar sesión</Link>
                        </div>
                    </div>
                </form>
            </div>

            <Link to="/" className="text-amber-500 underline text-sm">Volver a inicio</Link>
        </div>
    </div>
}
