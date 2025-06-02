import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { breadcrumbsAtom } from "../../../../../atoms/breadcrumbs.atom";
import { MainButton } from "../../../../../components/Buttons";
import { Input } from "../../../../../components/Forms";
import useDish from "../../../../../hooks/useDish";
import { Loading } from "../../../../../layouts/Loading";
import { IDish } from "../../../../../types/Dish";

export const CreateDishToMenu = () => {
  const { restaurantId, menuId } = useParams();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { handleCreateDish, loading, error } = useDish();
  const navigate = useNavigate();


  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: "Menú", path: `/staff/restaurant/${restaurantId}/menu` },
      { label: "Crear Plato", path: `/staff/restaurant/${restaurantId}/menu/${menuId}/create` },
    ]);
  }, [setBreadcrumbs, restaurantId, menuId]);

  const [dish, setDish] = useState<IDish>({
    id: "",
    name: "",
    description: "",
    price: 0,
    available: true,
    menuId: menuId || "",
  });

  const dishSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
    available: z.boolean(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [id]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      dishSchema.parse({
        ...dish,
        price: Number(dish.price),
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

    if (!menuId) return;

    const response = await handleCreateDish(menuId, { ...dish, menuId });
    if (response)
      navigate(`/staff/restaurant/${restaurantId}/menu`);
  };

  return (
    <div className="w-full flex flex-col gap-3 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
      <h1 className="text-4xl">Crear Plato</h1>
      <div className="my-20 flex flex-col gap-5">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            id="name"
            value={dish.name}
            onChange={handleInputChange}
            fieldErrors={fieldErrors.name}
          />
          <Input
            label="Descripción"
            id="description"
            value={dish.description}
            type="text"
            onChange={handleInputChange}
            fieldErrors={fieldErrors.description}
          />
          <Input
            label="Precio"
            id="price"
            value={dish.price.toString()}
            type="number"
            onChange={handleInputChange}
            fieldErrors={fieldErrors.price}
          />
          <label className="flex items-center gap-2 mt-2">
            <input
              id="available"
              type="checkbox"
              checked={dish.available}
              onChange={handleInputChange}
            />
            Disponible
          </label>
          {error && <p className="text-red-500">{error}</p>}
          {loading && <Loading />}
          <MainButton text="Crear" type="submit" className="mt-10" />
        </form>
      </div>
    </div>
  );
};