import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/users.api";
import { Input } from "../../components/Forms";

export const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!token) {
      setError("No hay ningún token de restablecimiento de contraseña.");
      return;
    }
    if (newPassword.length < 6) {
      setFieldErrors({ newPassword: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return <div className="min-h-screen flex items-center justify-center0">
    <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-center text-amber-700 drop-shadow-sm tracking-tight mb-2">Restablecer contraseña</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nueva contraseña"
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          fieldErrors={fieldErrors.newPassword}
        />
        <Input
          label="Repetir nueva contraseña"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          fieldErrors={fieldErrors.confirmPassword}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">¡Contraseña restablecida correctamente! Redirigiendo...</p>}
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-colors mt-4 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar nueva contraseña"}
        </button>
      </form>
      <div className="mt-6 text-center text-slate-600">
        <a href="/login" className="text-amber-600 underline underline-offset-4 text-xs hover:text-amber-500">Volver a inicio de sesión</a>
      </div>
    </div>
  </div>
};