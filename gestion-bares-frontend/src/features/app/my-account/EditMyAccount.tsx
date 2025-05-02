import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { breadcrumbsAtom } from "../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../atoms/user.atom";
import { MainButton } from "../../../components/Buttons";
import { Input } from "../../../components/Forms";
import { Loader } from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";

export const EditMyAccount = () => {
    const navigate = useNavigate();
    const [user] = useAtom(userAtom);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: '',
        surnames: '',
        email: '',
        telephone: '',
        password: '',
    });
    
    
    const { updateProfile, error } = useAuth();
    const updateSchema = z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        surnames: z.string().min(1, "Los apellidos son obligatorios"),
        email: z.string().email("El correo electrónico no es válido"),
        telephone: z.string().min(1, "El teléfono no es válido"),
        password: z.string().min(1, "La contraseña actual es obligatorio"),
    });
    
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                surnames: user.surnames || '',
                email: user.email || '',
                telephone: user.telephone || '',
                password: ''
            });
        }
    }, [user]);
    
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
    useEffect(() => {
        setBreadcrumbs([
            { label: "Mi cuenta", path: "/account" },
            { label: "Editar cuenta", path: `/account/edit/` }
        ])
    }, [setBreadcrumbs]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});

        try {
            updateSchema.parse(formData);
            const { password, ...userData } = formData;

            const response = await updateProfile({ ...user, ...userData }, password);
            setFormData(prev => ({ ...prev, password: '' }));
            if (response)
                navigate("/account");
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    errors[error.path[0]] = error.message;
                });
                setFieldErrors(errors);
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    return <div className="w-1/2 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
        <h1 className="text-5xl text-center mb-10">Editar Mi Cuenta</h1>

        <Loader loading={loading}>
            <form onSubmit={handleSubmit} className="flex gap-15">
                <div className="">
                    <Input label="Nombre"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        fieldErrors={fieldErrors.name}
                    />
                    <Input label="Email"
                        id="email"
                        value={formData.email}
                        type="email"
                        onChange={handleChange}
                        fieldErrors={fieldErrors.email}
                    />
                    <Input label="Teléfono"
                        id="telephone"
                        value={formData.telephone}
                        type="tel"
                        onChange={handleChange}
                        fieldErrors={fieldErrors.telephone}
                    />
                </div>
                <div className="">
                    <Input label="Apellidos"
                        id="surnames"
                        value={formData.surnames}
                        onChange={handleChange}
                        fieldErrors={fieldErrors.surnames}
                    />
                    <Input label="Contraseña actual"
                        id="password"
                        value={formData.password}
                        type="password"
                        onChange={handleChange}
                        fieldErrors={fieldErrors.password}
                    />
                    <MainButton className="mt-5 w-full" text='Guardar cambios' type='submit' />
                </div>
            </form>

            {error && <p className="text-red-500">{error}</p>}
        </Loader>
    </div>
}
