import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { deleteRestaurantStaff, getAllRestaurantStaff } from "../../../api/restaurantstaff.api";
import { userAtom } from "../../../atoms/user.atom";
import ConfirmModal from "../../../components/ConfirmModal";
import { showErrorToast, showSuccessToast } from "../../../components/ToastUtils";
import { IRestaurantStaff } from "../../../types/RestaurantStaff";

export const Asignations = () => {
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState<IRestaurantStaff[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.role === "ADMIN") {
            const fetchAssignments = async () => {
                try {
                    setLoading(true);
                    const response = await getAllRestaurantStaff();
                    if (response && response.data && Array.isArray(response.data)) {
                        setAssignments(response.data);
                    } else {
                        console.warn("getAllRestaurantStaff response.data is not an array or is missing:", response);
                        setAssignments([]);
                        showErrorToast("Received invalid data format for assignments.");
                    }
                } catch (err: any) {
                    console.error("Error fetching assignments:", err);
                    showErrorToast(err.message || "Failed to load assignments.");
                    setAssignments([]);
                } finally {
                    setLoading(false);
                }
            };
            fetchAssignments();
        } else if (user) {
            navigate("/main");
        }
    }, [user, navigate]);

    const handleDeleteAssignment = async (restaurantStaffId: string) => {
        try {
            await deleteRestaurantStaff(restaurantStaffId);
            setAssignments(prevAssignments => prevAssignments.filter(a => a.id !== restaurantStaffId));
            showSuccessToast("Asignación eliminada correctamente.");
        } catch (error: any) {
            console.error("Error deleting assignment:", error);
            showErrorToast(error.message || "Error al eliminar la asignación.");
        } finally {
            setAssignmentToDelete(null);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Restaurant Staff Assignments</h1>
            {loading && (
                <div className="flex justify-center items-center h-32">
                    <p className="text-lg text-gray-600">Loading assignments...</p>
                </div>
            )}
            {!loading && (
                <>
                    {assignments.length === 0 ? (
                        <p className="text-lg text-gray-600">No assignments found.</p>
                    ) : (
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Empleado</th>
                                        <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Restaurante</th>
                                        <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Fecha de asignación</th>
                                        <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                                    {assignments.map((assignment) => (
                                        <tr key={assignment.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <Link
                                                    to={`/admin/users/${assignment.staff?.id}`}
                                                    className="ml-2 text-amber-600 hover:text-amber-700 transition-colors duration-150"
                                                    title="Ver perfil del empleado"
                                                >
                                                    {assignment.staff?.name} {assignment.staff?.surnames}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <Link
                                                    to={`/admin/restaurants/${assignment.restaurant?.id}`}
                                                    className="ml-2 text-amber-600 hover:text-amber-700 transition-colors duration-150"
                                                    title="Ver restaurante"
                                                >
                                                    {assignment.restaurant?.name}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    onClick={() => setAssignmentToDelete(assignment.id)}
                                                    className="cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-150"
                                                    title="Eliminar asignación"
                                                >
                                                    <IoRemoveOutline size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
            <ConfirmModal
                isOpen={!!assignmentToDelete}
                text={"¿Estás seguro de que quieres eliminar esta asignación?"}
                onConfirm={() => {
                    if (assignmentToDelete) {
                        handleDeleteAssignment(assignmentToDelete);
                    }
                }}
                onCancel={() => setAssignmentToDelete(null)}
            />
        </div>
    );
};