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
      { label: "Inicio", path: "/main" },
      { label: "Restaurantes", path: "/admin/restaurants" },
      { label: 'Crear Restaurante', path: '/admin/restaurants/create' },

    ])
  }, [setBreadcrumbs]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { handleCreateRestaurant, loading, error } = useRestaurant();
  const navigate = useNavigate();

  const registrationSchema = z.object({
    name: z.string().min(5, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido"),
    phone: z.number().min(100000000, "El teléfono no es válido").max(999999999, "El teléfono no es válido"),
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

  return <div className="flex items-center justify-center">
    <div className="w-full px-8 py-10 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
      <h1 className="text-3xl font-extrabold text-center text-amber-700 drop-shadow-sm tracking-tight mb-6">
        Crear Restaurante
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-6">
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
        {/* Espacio vacío para alinear el botón en pantallas grandes */}
        <div className="hidden md:block" />
        {error && (
          <p className="md:col-span-2 text-red-500 text-center">{error}</p>
        )}
        {loading && (
          <div className="md:col-span-2 flex justify-center">
            <Loading />
          </div>
        )}
        <div className="md:col-span-2">
          <MainButton text="Crear" type="submit" className="w-full mt-4" />
        </div>
      </form>
    </div>
  </div>
}
