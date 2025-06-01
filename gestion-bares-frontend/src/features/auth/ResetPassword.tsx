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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-amber-950 text-neutral-100">
      <div className="px-8 py-10 bg-neutral-800 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Recuperar contraseña</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Email"
            id="email"
            value={email}
            type="email"
            onChange={handleInputChange}
            fieldErrors={fieldErrors.email}
          />
          {error && <p className="text-red-500">{error}</p>}
          {loading && <Loading />}
          <MainButton text='Cambiar contraseña' type='submit' />
        </form>
        <div className="mt-8 text-center">
          <Link to="/" className="text-amber-500 underline text-sm">Volver a inicio</Link>
        </div>
      </div>
    </div>
  );
};