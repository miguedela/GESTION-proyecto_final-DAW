import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { MainButton } from '../../components/Buttons'
import { Input } from '../../components/Forms'
import useAuth from '../../hooks/useAuth'
import { Loading } from '../../layouts/Loading'
import { ILoginUser } from '../../types/User'

export const LogIn = () => {
    const [user, setUser] = useState<ILoginUser>({
        email: '',
        password: ''
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const registrationSchema = z.object({
        email: z.string().email("El correo electrónico no es válido"),
        password: z.string().min(2, "La contraseña debe tener al menos 6 caracteres")
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
            registrationSchema.parse(user);
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
        if (response)
            navigate('/main');
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/main');
        }
    }, [navigate]);

    return <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-900  to-amber-950 text-neutral-100">
        <div className="px-20 py-10 bg-neutral-800 rounded-lg shadow-lg">
            <h1 className="text-4xl">Inicio de sesión</h1>

            <div className="my-20 flex flex-col gap-5">
                <form onSubmit={handleSubmit}>
                    <Input label="Email"
                        id="email"
                        value={user.email}
                        type="email"
                        onChange={handleInputChange}
                        fieldErrors={fieldErrors.email}
                    />
                    <Input
                        label="Contraseña"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={handleInputChange}
                        fieldErrors={fieldErrors.password}
                    />

                    {error && <p className="text-red-500">{error}</p>}
                    {loading && <Loading />}

                    <div className='mt-10 flex gap-5 items-center justify-between'>
                        <MainButton text='Entrar' type='submit' />
                        <div>
                            <div className="flex flex-col items-end">
                                <p className="text-sm text-neutral-400">¿Aún no tienes cuenta?</p>
                                <Link to="/signup" className="text-amber-500 underline">Registrarme</Link>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-sm text-neutral-400">¿Has olvidado tu contraseña?</p>
                                <Link to="/account/reset-password" className="text-amber-500 underline">Recuperar contraseña</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Link to="/" className="text-amber-500 underline text-sm">Volver a inicio</Link>
            <Link to="/" className="text-amber-500 underline text-sm">Cambiar contraseña</Link>

        </div>
    </div>
}
