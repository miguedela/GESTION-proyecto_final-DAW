import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import useUser from "../../../../hooks/useUser";

export const UsersManagement = () => {
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

    useEffect(() => {
        setBreadcrumbs([
            { label: "Usuarios", path: "/admin/users" }
        ])
    }, [setBreadcrumbs]);

    const [sortBy, setSortBy] = useState<string>("creationDate");
    const [sortedOrder, setSortedOrder] = useState<"asc" | "desc">("desc");

    const { users, handleLoadUsers } = useUser();

    const handleSort = (field: string) => {
        const newOrder = sortBy === field ? (sortedOrder === "asc" ? "desc" : "asc") : "asc";

        setSortBy(field);
        setSortedOrder(newOrder);

        const sortParam = `${field}, ${newOrder}`;

        handleLoadUsers({
            page: 0,
            size: users.pagination.size,
            filters: {
                ...users.pagination.filters,
                sort: sortParam
            }
        });
    };

    useEffect(() => {
        handleLoadUsers({ page: 0, size: 5 });
    }, [handleLoadUsers]);


    return <div>
        <h1 className="dark:text-white text-dark">Usuarios</h1>

    </div>
}
