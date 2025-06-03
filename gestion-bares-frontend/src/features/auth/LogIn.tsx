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

    return <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col gap-8">
            <h1 className="text-3xl font-extrabold text-center text-amber-700 drop-shadow-sm tracking-tight mb-2">Inicio de sesión</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {loading && <Loading />}
                <MainButton text='Entrar' type='submit' className="w-full mt-2" />
            </form>
            <div className="flex flex-col gap-2 text-sm text-center text-slate-600">
                <span>¿Aún no tienes cuenta? <Link to="/signup" className="text-amber-600 underline underline-offset-4 hover:text-amber-500">Registrarme</Link></span>
                <span>¿Has olvidado tu contraseña? <Link to="/account/reset-password" className="text-amber-600 underline underline-offset-4 hover:text-amber-500">Recuperar contraseña</Link></span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
                <Link to="/" className="text-amber-600 underline underline-offset-4 text-xs hover:text-amber-500">Volver a inicio</Link>
            </div>
        </div>
    </div>
}
