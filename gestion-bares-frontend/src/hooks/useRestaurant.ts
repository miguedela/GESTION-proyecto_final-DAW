import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRestaurant, loadRestaurants, registerRestaurant, updateRestaurant } from "../api/restaurants.api";
import { restaurantAtom } from "../atoms/restaurants.atom";
import { showErrorToast, showSuccessToast } from "../components/ToastUtils";
import { IPaginationInfo, PaginationInfo } from "../types/Pagination";
import { IRestaurant } from "../types/Restaurants";
import { IUser } from "../types/User";
import { setMessageError } from "../utils/utilsFunctions";

const useRestaurant = () => {
    const [restaurants, setRestaurants] = useAtom(restaurantAtom);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleGetRestaurants = useCallback(
        async (pagination: IPaginationInfo) => {
            setRestaurants((prev) => ({ ...prev, loading: true }));

            try {
                const { data } = await loadRestaurants(pagination.page, pagination.size, pagination.filters);

                setRestaurants((prev) => ({
                    ...prev,
                    content: data.content,
                    pagination: {
                        ...pagination,
                        totalElements: data.totalElements,
                        totalPages: data.totalPages,
                        filters: pagination.filters,
                    },
                    loading: false,
                }));
                showSuccessToast("Restaurantes cargados exitosamente.");
            } catch (error) {
                console.error(error)
                setRestaurants((prev) => ({ ...prev, loading: false }));
                showErrorToast("Error al cargar los restaurantes. Por favor, inténtalo de nuevo.");
            }
        },
        [setRestaurants]
    );

    const handleCreateRestaurant = async (restaurant: IRestaurant) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerRestaurant(restaurant);
            setLoading(false);
            showSuccessToast("Restaurante creado exitosamente.");
            return response;
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al crear el restaurante. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteRestaurant = async (id: string) => {
        try {
            await deleteRestaurant(id);
            navigate("/admin/restaurants")
            if (location.pathname === "/admin/restaurants") handleGetRestaurants({ page: 0, size: restaurants.pagination.size });
            showSuccessToast("Restaurante eliminado exitosamente.");
        } catch (error) {
            console.error("Error deleting user: ", error);
            showErrorToast("Error al eliminar el restaurante. Por favor, inténtalo de nuevo.");
        }
    }

    const handleUpdateRestaurant = async (user: IUser, restaurant: IRestaurant) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateRestaurant(user, restaurant);
            showSuccessToast("Restaurante actualizado exitosamente.");
            return response;
        } catch (error: unknown) {
            setMessageError(error, setError);
            showErrorToast("Error al actualizar el restaurante. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    const handlePageChange = async (newPage: number, size: number) => {
        const updatePagination: PaginationInfo = {
            page: newPage,
            size: size,
            filters: restaurants.pagination.filters,
            sort: restaurants.pagination.sort
        }

        handleGetRestaurants(updatePagination);
    }

    const handleSearch = async (search: string) => {
        const filters = {
            ...restaurants.pagination.filters,
            general: search
        }

        handleGetRestaurants({
            page: 0,
            size: restaurants.pagination.size,
            filters
        });
    };

    return {
        handleGetRestaurants,
        handleCreateRestaurant,
        handleDeleteRestaurant,
        handleUpdateRestaurant,
        loadRestaurants,
        handlePageChange,
        handleSearch,
        restaurants,
        loading,
        error
    }
};

export default useRestaurant;