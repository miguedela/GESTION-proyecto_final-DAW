import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoArrowDownOutline, IoArrowUpOutline, IoEyeOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../../atoms/user.atom";
import { Pill } from "../../../../components/Buttons";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Loader } from "../../../../components/Loader";
import { Paginator } from "../../../../components/Paginator";
import { UsersFilters } from "../../../../components/UsersFilters";
import useUser from "../../../../hooks/useUser";
import { Roles } from "../../../../types/User";
import { formatDateShort } from "../../../../utils/dateUtils";

export const UsersManagement = () => {
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
    useEffect(() => {
        setBreadcrumbs([
            { label: "Inicio", path: "/main" },
            { label: "Usuarios", path: "/admin/users" }
        ])
    }, [setBreadcrumbs]);

    const [myUser] = useAtom(userAtom);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const [sortBy, setSortBy] = useState<string>("creationDate");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const { users, handleLoadUsers, handlePageChange, handleDeleteUser } = useUser();

    const handleSort = (field: string) => {
        const newOrder = sortBy === field ? (sortOrder === "asc" ? "desc" : "asc") : "asc";

        setSortBy(field);
        setSortOrder(newOrder);

        const sortParam = `${field},${newOrder}`;

        handleLoadUsers({ page: 0, size: users.pagination.size, filters: { ...users.pagination.filters, sort: sortParam } });
    };

    useEffect(() => {
        handleLoadUsers({ page: 0, size: 5 });
    }, [handleLoadUsers]);

    return <div className="w-full flex flex-col gap-3 bg-white text-dark rounded-md p-20">
        <UsersFilters />
        <Loader loading={users.loading}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {[
                            { label: "Email", key: "email" },
                            { label: "Nombre", key: "name" },
                            { label: "Apellidos", key: "surnames" },
                            { label: "Teléfono", key: "telephone" },
                            { label: "Fecha de creación", key: "creationDate" },
                            { label: "Role", key: "role" },
                        ].map(({ label, key }) => (
                            <th key={key} className="px-6 py-3 cursor-pointer select-none" onClick={() => handleSort(key)}>
                                <span className="flex items-center gap-1">{label}
                                    {sortBy === key &&
                                        (sortOrder === "asc" ? <IoArrowUpOutline /> : <IoArrowDownOutline />)}
                                </span>
                            </th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.content.map((user, index) => (
                        <tr key={index} className="bg-white border-b border-neutral-800 hover:bg-gray-50">
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.surnames}</td>
                            <td className="px-6 py-4">{user.telephone}</td>
                            <td className="px-6 py-4">{formatDateShort(user.creationDate)}</td>
                            <td className="px-6 py-4">
                                <Pill text={user.role.toString()} color={user.role.toString() === "ADMIN" ? "yellow" : user.role.toString() === Roles.STAFF ? "purple" : "amber"} />
                            </td>
                            <td className="py-4 flex items-center gap-3">
                                <Link to={`/admin/users/${user.id}`}><IoEyeOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>
                                {myUser.id !== user.id &&
                                    <>
                                        <Link to={`/admin/users/edit/${user.id}`}><IoPencilOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>
                                        <button onClick={() => setUserToDelete(user.id)} className="cursor-pointer">
                                            <IoTrashOutline className="text-xl text-red-500 hover:text-red-600" />
                                        </button>
                                    </>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-6">
                <Paginator totalElements={users.pagination.totalElements || 0} pageCount={users.pagination.totalPages || 1} page={users.pagination.page} defaultSize={users.pagination.size} availableSizes={[5, 10, 15]} onPageChange={handlePageChange} />
            </div>

            <ConfirmModal
                isOpen={!!userToDelete}
                text={"Estás seguro de que quieres eliminar el usuario?"}
                onConfirm={() => {
                    if (userToDelete) handleDeleteUser(userToDelete)
                    setUserToDelete(null);
                }}
                onCancel={() => setUserToDelete(null)}
            />
        </Loader>
    </div>
}
