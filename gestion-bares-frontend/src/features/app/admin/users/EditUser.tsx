import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { getRestaurantsByStaff } from "../../../../api/restaurantstaff.api";
import { loadUser, updateUser } from "../../../../api/users.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { MainButton } from "../../../../components/Buttons";
import { Input, Select } from "../../../../components/Forms";
import { Loader } from "../../../../components/Loader";
import { showErrorToast } from "../../../../components/ToastUtils";
import useRestaurant from "../../../../hooks/useRestaurant";
import useRestaurantStaff from "../../../../hooks/useRestaurantStaff";
import { IRestaurant } from "../../../../types/Restaurants";
import { IUser, Roles } from "../../../../types/User";

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
    const [restaurantsAssigned, setRestaurantsAssigned] = useState<IRestaurant[]>([]);

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
            { label: "Inicio", path: "/main" },
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
            editScheme.parse({ ...user });

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
                console.error("Error updating user: ", err);
                showErrorToast("Error al actualizar el usuario. Por favor, inténtalo de nuevo.");
            }
        } finally {
            setLoading(false);
        }

    };
    user
    const handleAsignRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await handleAddStaffToRestaurant(id!, selectedRestaurant);
        if (response) {
            navigate(`/admin/asignations`);
        }
    };

    const fetchRestaurants = async () => {
        const response = await getRestaurantsByStaff(id!);
        setRestaurantsAssigned(response.data);
    };

    useEffect(() => {
        if (!id)
            navigate("/admin/users");
        else
            handleLoadUser();

        handleGetRestaurants({ page: 0, size: 999 });
        fetchRestaurants();
    }, [id, navigate, handleLoadUser, handleGetRestaurants]);

    return <div className="w-full lg:w-3/4 xl:w-1/2 mx-auto bg-white text-dark rounded-md p-6 md:p-10 lg:p-20">
        <Loader loading={loading}>
            <h1 className="mb-7 text-2xl font-semibold">Editar usuario</h1>

            <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
                {user &&
                    <form onSubmit={handleEditUser} className="flex flex-col flex-1">
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

                {user?.role === Roles.STAFF &&
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="mb-5">
                            <h2 className="text-xl font-semibold mt-5 mb-3">Asignaciones</h2>
                            {restaurantsAssigned.length > 0 ? (
                                <ul>
                                    {restaurantsAssigned.map((restaurant) => (
                                        <li key={restaurant.id} className="mb-2">
                                            {restaurant.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Este staff aún no tiene restaurantes asignados.</p>
                            )}
                        </div>
                        <form onSubmit={handleAsignRestaurant} className="flex flex-col gap-4">
                            <Select label="Restaurante"
                                id="restaurant"
                                value={selectedRestaurant}
                                onChange={(e) => setSelectedRestaurant(e.target.value)}
                                options={
                                    restaurants.content
                                        .filter(restaurant =>
                                            !restaurantsAssigned.some(assignedRestaurant => assignedRestaurant.id === restaurant.id)
                                        )
                                        .map((restaurant) => ({
                                            label: restaurant.name,
                                            value: restaurant.id,
                                        }))
                                }
                                fieldErrors={fieldErrors.role}
                                placeholderOption="Seleccione un restaurante..."
                            />

                            <MainButton text='Asignar restaurante' type='submit' />
                        </form>
                    </div>
                }
            </div>

        </Loader>
    </div>
}
