import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { IoPencilOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadRestaurant } from "../../../api/restaurants.api";
import { breadcrumbsAtom } from "../../../atoms/breadcrumbs.atom";
import ConfirmModal from "../../../components/ConfirmModal";
import { Loader } from "../../../components/Loader";
import useRestaurant from "../../../hooks/useRestaurant";
import { IRestaurant } from "../../../types/Restaurants";
import { formatDate } from "../../../utils/dateUtils";

export const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Restaurantes', path: "/staff/restaurants" },
      { label: `${restaurant?.name}`, path: `/staff/restaurants/${id}` },
    ]);
  }, [id, restaurant, setBreadcrumbs])

  const { handleDeleteRestaurant } = useRestaurant();

  const handleLoadRestaurant = useCallback(
    async () => {
      setLoading(true);

      try {
        const response = await loadRestaurant(id!);
        if (response.status !== 200)
          navigate('/staff/restaurants')

        setRestaurant(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading restaurant: ", error);
        setLoading(false);
      }
    }, [setRestaurant, id, navigate]
  );

  useEffect(() => {
    if (!id)
      navigate("/staff/restaurants")
    else
      handleLoadRestaurant()
  }, [id, navigate, handleLoadRestaurant]);

  return (<div className="w-1/2 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
    <Loader loading={loading}>
      <div>
        <h1 className="mb-7">Detalles del restaurante</h1>

        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Nombre</span>
          <p className="ml-2 mt-1">{restaurant?.name}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Descripcion</span>
          <p className="ml-2 mt-1">{restaurant?.description}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Dirección</span>
          <p className="ml-2 mt-1">{restaurant?.address}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Email</span>
          <p className="ml-2 mt-1">{restaurant?.email}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Teléfono</span>
          <p className="ml-2 mt-1">{restaurant?.phone}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Fecha de creación</span>
          <p className="ml-2 mt-1">{restaurant?.creationDate && formatDate(restaurant?.creationDate)}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Horas abierto</span>
          <p className="ml-2 mt-1">{restaurant?.openingHours && formatDate(restaurant?.openingHours)}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Última modificación</span>
          <p className="ml-2 mt-1">{restaurant?.lastModifiedDate && formatDate(restaurant?.lastModifiedDate)}</p>
        </div>
        <Link to={`/staff/restaurants/${restaurant?.id}/edit`}><IoPencilOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>

        <ConfirmModal
          isOpen={modalOpen}
          text={"Estás seguro de que quieres eliminar el usuario?"}
          type="negative"
          onConfirm={() => handleDeleteRestaurant(id!)}
          onCancel={() => setModalOpen(false)}
        />
      </div>
    </Loader>
  </div>
  )
}
