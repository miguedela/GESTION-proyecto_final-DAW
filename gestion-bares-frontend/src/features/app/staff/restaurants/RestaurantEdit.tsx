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
  const id = localStorage.getItem("restaurantId");
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { handleUpdateRestaurant, loading } = useRestaurant();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: `${restaurant?.name}`, path: `/staff/restaurant/info` },
      { label: "Editar", path: `/staff/restaurant/edit` },
    ]);
  }, [id, restaurant, setBreadcrumbs]);

  const fetchRestaurant = useCallback(async () => {
    if (!id) return;
    try {
      const response = await loadRestaurant(id);

      setRestaurant(response.data);
    } catch (err) {
      console.error("Error loading restaurant: ", err);
      navigate("/staff/restaurants");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchRestaurant();
  }, [fetchRestaurant]);

  const editSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().optional(),
    address: z.string().min(10, "La dirección es obligatoria"),
    email: z.string().email("El correo electrónico no es válido"),
    phone: z.string().regex(/^[0-9]{9}$/, "El teléfono debe contener exactamente 9 dígitos"),
    customerAmmount: z.string().min(1, "La capacidad del restaurante es obligatoria")
      .regex(/^\d+$/, "La capacidad del restaurante debe ser un número válido")
      .transform((val) => parseInt(val, 10))
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
        customerAmmount: restaurant.customerAmmount,
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
      navigate(`/staff/restaurant/info`);
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
          <Input
            label="Capacidad del restaurante"
            id="customerAmmount"
            value={restaurant.customerAmmount}
            type="number"
            onChange={handleInputChange}
            fieldErrors={fieldErrors.customerAmmount}
          />
          {loading && <Loading />}
          <MainButton text='Guardar cambios' type='submit' className="mt-10 transition-scale hover:scale-105 active:scale-95" />
        </form>
      </div>
    </div>
  );
};