import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { MainButton } from "../../../../components/Buttons";
import { Input } from "../../../../components/Forms";
import useRestaurant from "../../../../hooks/useRestaurant";
import { Loading } from "../../../../layouts/Loading";
import { IRestaurant } from "../../../../types/Restaurants";

export const CreateRestaurant = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    creationDate: new Date(),
    description: '',
    lastModifiedDate: new Date(),
    openingHours: ''
  });

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Restaurantes", path: "/admin/restaurants" },
      { label: 'Crear Restaurante', path: '/admin/restaurants/create' },

    ])
  }, [setBreadcrumbs]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { handleCreateRestaurant, loading, error } = useRestaurant();
  const navigate = useNavigate();

  const registrationSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido"),
    phone: z.string().min(1, "El teléfono no es válido"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      registrationSchema.parse({
        ...restaurant
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

    const response = await handleCreateRestaurant(restaurant);
    if (response)
      navigate('/account');
  }

  return <div className="w-full flex flex-col gap-3 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
    <h1 className="text-4xl">Crear Restaurante</h1>

    <div className="my-20 flex flex-col gap-5">
      <form onSubmit={handleSubmit}>
        <Input label="Nombre"
          id="name"
          value={restaurant.name}
          onChange={handleInputChange}
          fieldErrors={fieldErrors.name}
        />
        <Input label="Descripción"
          id="description"
          value={restaurant.description}
          type="text"
          onChange={handleInputChange}
        />
        <Input label="Email"
          id="email"
          value={restaurant.email}
          type="email"
          onChange={handleInputChange}
          fieldErrors={fieldErrors.email}
        />
        <Input label="Teléfono"
          id="phone"
          value={restaurant.phone}
          type="tel"
          onChange={handleInputChange}
          fieldErrors={fieldErrors.phone}
        />
        <Input label="Dirección"
          id="address"
          value={restaurant.address}
          type="text"
          onChange={handleInputChange}
        />

        {error && <p className="text-red-500">{error}</p>}
        {loading && <Loading />}

        <MainButton text='Crear' type='submit' className="mt-10" />
      </form>
    </div>
  </div>
}
