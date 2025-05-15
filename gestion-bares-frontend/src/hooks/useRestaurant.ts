import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRestaurant, loadRestaurants, registerRestaurant, updateRestaurant } from "../api/restaurants.api";
import { restaurantAtom } from "../atoms/restaurants.atom";
import { IPaginationInfo, PaginationInfo } from "../types/Pagination";
import { IRestaurant } from "../types/Restaurants";
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
            } catch (error) {
                console.error(error)
                setRestaurants((prev) => ({ ...prev, loading: false }));
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
            return response;
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteRestaurant = async (id: string) => {
        try {
            await deleteRestaurant(id);
            navigate("/admin/restaurants")
            if (location.pathname === "/admin/restaurants") handleGetRestaurants({ page: 0, size: restaurants.pagination.size });
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    }

    const handleUpdateRestaurant = async (restaurant: IRestaurant) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateRestaurant(restaurant);
            return response;
        } catch (error: unknown) {
            setMessageError(error, setError)
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

    return { handleGetRestaurants, handleCreateRestaurant, handleDeleteRestaurant, handleUpdateRestaurant, loadRestaurants, handlePageChange, handleSearch, restaurants, loading, error }
};

export default useRestaurant;