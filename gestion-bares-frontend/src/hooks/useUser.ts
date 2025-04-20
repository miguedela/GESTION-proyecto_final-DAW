import { useCallback } from "react";
import { IPaginationInfo, PaginationInfo } from "../types/Pagination";
import { deleteUser, loadUsers } from "../api/users.api";
import { useAtom } from "jotai";
import { usersAtom } from "../atoms/users.atom";
import { useLocation, useNavigate } from "react-router-dom";

const useUser = () => {
    const [users, setUsers] = useAtom(usersAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoadUsers = useCallback(
        async (pagination: IPaginationInfo) => {
            setUsers((prev) => ({ ...prev, loading: true }));

            try {
                const { data } = await loadUsers(pagination.page, pagination.size, pagination.filters);

                setUsers((prev) => ({
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
                setUsers((prev) => ({ ...prev, loading: false }));
            }
        },
        [setUsers]
    );

    const handleStateFilter = async (state: string) => {
        const currentFilters = { ...users.pagination.filters };

        if (!state) delete currentFilters.role;
        else currentFilters.role = state;

        await handleLoadUsers({
            page: 0,
            size: users.pagination.size,
            filters: currentFilters
        })
    };

    const handlePageChange = async (newPage: number, size: number) => {
        const updatePagination: PaginationInfo = {
            page: newPage,
            size: size,
            filters: users.pagination.filters,
            sort: users.pagination.sort
        }

        handleLoadUsers(updatePagination);
    }

    const handleSearch = async (search: string) => {
        const filters = {
            ...users.pagination.filters,
            general: search
        }

        handleLoadUsers({
            page: 0,
            size: users.pagination.size,
            filters
        });
    };


    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id);
            navigate("/admin/users")
            if (location.pathname === "/admin/users") handleLoadUsers({ page: 0, size: users.pagination.size });
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    }

    return { handleLoadUsers, handleStateFilter, handlePageChange, handleSearch, handleDeleteUser, users }
};

export default useUser;