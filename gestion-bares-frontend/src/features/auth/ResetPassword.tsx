import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { MainButton } from '../../components/Buttons'
import { Input } from '../../components/Forms'
import { Loading } from '../../layouts/Loading'
import { sendEmailChangePassword } from '../../api/email.api'

export const ResetPassword = () => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registrationSchema = z.object({
    email: z.string().email("El correo electrónico no es válido"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFieldErrors({});
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    try {
      registrationSchema.parse({ email });
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

    setLoading(true);
    try {
      await sendEmailChangePassword(email);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/account');
    }
  }, [navigate]);

  return <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-center text-amber-700 drop-shadow-sm tracking-tight mb-2">Recuperar contraseña</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input
          label="Email"
          id="email"
          value={email}
          type="email"
          onChange={handleInputChange}
          fieldErrors={fieldErrors.email}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {loading && <Loading />}
        <MainButton text='Cambiar contraseña' type='submit' className="w-full mt-2" />
      </form>
      <div className="mt-8 text-center text-slate-600">
        <Link to="/" className="text-amber-600 underline underline-offset-4 text-xs hover:text-amber-500">Volver al inicio</Link>
      </div>
    </div>
  </div>
};