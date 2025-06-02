import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { loadRestaurant } from "../../../../api/restaurants.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../../atoms/user.atom";
import { MainButton } from "../../../../components/Buttons";
import { Input } from "../../../../components/Forms";
import useRestaurant from "../../../../hooks/useRestaurant";
import { Loading } from "../../../../layouts/Loading";
import { IRestaurant } from "../../../../types/Restaurants";

export const RestaurantEdit = () => {
  const [restaurantId] = useState(localStorage.getItem("restaurantId"));
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { handleUpdateRestaurant, loading, error } = useRestaurant();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: "Restaurantes", path: "/staff/restaurants" },
      { label: `${restaurant?.name}`, path: `/staff/restaurant/${restaurantId}` },
      { label: "Editar", path: `/staff/restaurant/${restaurantId}/edit` },
    ]);
  }, [restaurantId, restaurant, setBreadcrumbs]);

  const fetchRestaurant = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const response = await loadRestaurant(restaurantId);

      setRestaurant(response.data);
    } catch (err) {
      console.error("Error loading restaurant: ", err);
      navigate("/staff/restaurants");
    }
  }, [restaurantId, navigate]);

  useEffect(() => {
    fetchRestaurant();
  }, [fetchRestaurant]);

  const editSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido"),
    phone: z.string().min(1, "El teléfono no es válido"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRestaurant((prev) => prev ? { ...prev, [id]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    if (!restaurant) return;

    try {
      editSchema.parse({
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone,
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

    const response = await handleUpdateRestaurant(user, restaurant);
    if (response)
      navigate(`/staff/restaurant/${restaurant.id}`);
  };

  if (!restaurant) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col gap-3 bg-white text-dark rounded-md p-20">
      <h1 className="text-4xl">Editar Restaurante</h1>
      <div className="my-20 flex flex-col gap-5">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            id="name"
            value={restaurant.name}
            onChange={handleInputChange}
            fieldErrors={fieldErrors.name}
          />
          <Input
            label="Descripción"
            id="description"
            value={restaurant.description}
            type="text"
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            id="email"
            value={restaurant.email}
            type="email"
            onChange={handleInputChange}
            fieldErrors={fieldErrors.email}
          />
          <Input
            label="Teléfono"
            id="phone"
            value={restaurant.phone}
            type="tel"
            onChange={handleInputChange}
            fieldErrors={fieldErrors.phone}
          />
          <Input
            label="Dirección"
            id="address"
            value={restaurant.address}
            type="text"
            onChange={handleInputChange}
          />
          <Input
            label="Horario"
            id="openingHours"
            value={restaurant.openingHours}
            type="text"
            onChange={handleInputChange}
          />

          {error && <p className="text-red-500">{error}</p>}
          {loading && <Loading />}

          <MainButton text='Guardar cambios' type='submit' className="mt-10" />
        </form>
      </div>
    </div>
  );
};