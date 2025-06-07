import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRestaurantStaff } from "../../../api/restaurantstaff.api";
import { userAtom } from "../../../atoms/user.atom";
import { IRestaurantStaff } from "../../../types/RestaurantStaff"; // Added
import { showErrorToast } from "../../../components/ToastUtils";

export const Asignations = () => {
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState<IRestaurantStaff[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
        } else {
            navigate("/main");
        }
    }, [user, navigate]);

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
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                                    {assignments.map((assignment) => (
                                        <tr key={assignment.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="py-4 px-5 whitespace-nowrap">
                                                {assignment.staff?.name || 'N/A'}
                                            </td>
                                            <td className="py-4 px-5 whitespace-nowrap">
                                                {assignment.restaurant?.name || 'N/A'}
                                            </td>
                                            <td className="py-4 px-5 whitespace-nowrap">
                                                {assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleString() : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};