import { useAtom } from "jotai"
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom"
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../../types/User";
import { loadUser, updateUser } from "../../../../api/users.api";
import { z } from "zod";
import { Loader } from "../../../../components/Loader";
import { Input, Select } from "../../../../components/Forms";
import { MainButton } from "../../../../components/Buttons";

export const EditUser = () => {
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const { id } = useParams();

    const handleLoadUser = useCallback(
        async () => {
            setLoading(true);

            try {
                const response = await loadUser(id!);
                if (response.status !== 200)
                    navigate('/admin/users')

                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error loading user: ", error);
                setLoading(false);
            }
        }, [setUser, id, navigate]
    );

    useEffect(() => {
        setBreadcrumbs([
            { label: "Usuarios", path: "/admin/users" },
            { label: "Editar usuario", path: `/admin/users/edit/${id}` }
        ])
    }, [id, setBreadcrumbs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setUser(prev => prev ? { ...prev, [id]: value } : prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return

        setFieldErrors({});

        try {
            editScheme.parse({ ...user })
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

        const response = await updateUser(user);
        if (response)
            navigate(`/admin/users/${id}`)
    };

    const editScheme = z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        surnames: z.string().min(1, "Los apellidos son obligatorios"),
        email: z.string().email("El correo electrónico no es válido"),
        telephone: z.string().min(1, "El teléfono no es válido"),
        role: z.string().min(1, "El rol es obligatorio"),
    });

    useEffect(() => {
        if (!id)
            navigate("/admin/users")
        else
            handleLoadUser()
    }, [id, navigate, handleLoadUser]);

    return <div>
        <Loader loading={loading}>
            <h1 className="text-3xl mb-7">Editar usuario</h1>

            {user &&
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <Input label="Nombre"
                        id="name"
                        value={user.name}
                        onChange={handleChange}
                        fieldErrors={fieldErrors.name}
                    />
                    <Input label="Apellidos"
                        id="surnames"
                        value={user.surnames}
                        onChange={handleChange}
                        fieldErrors={fieldErrors.surnames}
                    />
                    <Input label="Email"
                        id="email"
                        value={user.email}
                        type="email"
                        onChange={handleChange}
                        fieldErrors={fieldErrors.email}
                    />
                    <Input label="Teléfono"
                        id="telephone"
                        value={user.telephone}
                        type="tel"
                        onChange={handleChange}
                        fieldErrors={fieldErrors.telephone}
                    />
                    <Select label="Rol"
                        id="role"
                        value={user.role.toString()}
                        onChange={handleChange}
                        options={[
                            { label: 'Administrador', value: 'ADMIN' },
                            { label: 'Personal', value: 'STAFF' },
                            { label: 'Usuario', value: 'CUSTOMER' },
                        ]}
                        fieldErrors={fieldErrors.role}
                        placeholderOption="Seleccione un rol..."
                    />

                    <MainButton text='Guardar cambios' type='submit' />
                </form>
            }
        </Loader>
    </div >
}
