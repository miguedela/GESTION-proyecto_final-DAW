import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { loadUser, updateUser } from "../../../../api/users.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { MainButton } from "../../../../components/Buttons";
import { Input, Select } from "../../../../components/Forms";
import { Loader } from "../../../../components/Loader";
import useRestaurant from "../../../../hooks/useRestaurant";
import { IUser, Roles } from "../../../../types/User";
import { setMessageError } from "../../../../utils/utilsFunctions";
import useRestaurantStaff from "../../../../hooks/useRestaurantStaff";

const editScheme = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    surnames: z.string().min(1, "Los apellidos son obligatorios"),
    email: z.string().email("El correo electrónico no es válido"),
    telephone: z.string().min(1, "El teléfono no es válido"),
    role: z.string().min(1, "El rol es obligatorio"),
});

export const EditUser = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const { restaurants, handleGetRestaurants } = useRestaurant();
    const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    const { handleAddStaffToRestaurant } = useRestaurantStaff();

    const handleLoadUser = useCallback(
        async () => {
            setLoading(true);

            try {
                const response = await loadUser(id!);
                if (response.status !== 200)
                    navigate('/admin/users')

                setUser(response.data);
            } catch (error) {
                console.error("Error loading user: ", error);
            } finally {
                setLoading(false);
            }
        }, [setUser, id, navigate]
    );

    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
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

    const handleEditUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return
        setFieldErrors({});

        try {
            // Primero validamos con Zod
            editScheme.parse({ ...user });

            // Si la validación es exitosa, procedemos con la actualización
            const response = await updateUser(user);
            if (response) {
                navigate(`/admin/users`);
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    errors[error.path[0]] = error.message;
                });
                setFieldErrors(errors);
            } else {
                setMessageError(err, setError);
            }
        } finally {
            setLoading(false);
        }

    };

    const handleAsignRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await handleAddStaffToRestaurant(id!, selectedRestaurant);
        if (response) {
            navigate(`/admin/users`);
        }
    };

    useEffect(() => {
        if (!id)
            navigate("/admin/users");
        else
            handleLoadUser();

        handleGetRestaurants({ page: 0, size: 999 });
    }, [id, navigate, handleLoadUser, handleGetRestaurants]);

    return <div className="w-1/2 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
        <Loader loading={loading}>
            <h1 className="mb-7">Editar usuario</h1>

            <div className="flex flex-row justify-between">
                {user &&
                    <form onSubmit={handleEditUser} className="flex flex-col">
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

                {user?.role.toString() === Roles.STAFF &&
                    <form onSubmit={handleAsignRestaurant} className="flex flex-col">
                        <Select label="Restaurante"
                            id="restaurant"
                            value={selectedRestaurant}
                            onChange={(e) => setSelectedRestaurant(e.target.value)}
                            options={
                                restaurants.content.map((restaurant) => ({
                                    label: restaurant.name,
                                    value: restaurant.id,
                                }))
                            }
                            fieldErrors={fieldErrors.role}
                            placeholderOption="Seleccione un restaurante..."
                        />

                        <MainButton text='Asignar restaurante' type='submit' />
                    </form>
                }
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </Loader>
    </div>
}
