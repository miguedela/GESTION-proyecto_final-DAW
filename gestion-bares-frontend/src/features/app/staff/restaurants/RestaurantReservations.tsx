import { useEffect, useState } from 'react';
import { loadReservationsByRestaurant } from '../../../../api/reservations.api';
import { IReservation, Status } from '../../../../types/Reservation';

export const RestaurantReservations = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            setError(null);
            try {
                const restaurantId = localStorage.getItem('restaurantId');
                if (!restaurantId) {
                    setError('No se encontró el restaurante.');
                    setReservations([]);
                    setLoading(false);
                    return;
                }
                const response = await loadReservationsByRestaurant(restaurantId);
                setReservations(response.data || []);
            } catch (err) {
                setError('Error al cargar las reservas.');
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-extrabold mb-6 text-amber-600 tracking-tight">Reservas del Restaurante</h2>
            {loading && <div className="text-amber-600 text-center py-4">Cargando reservas...</div>}
            {error && <div className="text-red-600 text-center py-4">{error}</div>}
            {!loading && !error && reservations.length === 0 && (
                <div className="text-gray-400 text-center py-8">No hay reservas para este restaurante.</div>
            )}
            {!loading && !error && reservations.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Cliente</th>
                                <th className="px-4 py-2 text-left">Fecha</th>
                                <th className="px-4 py-2 text-left">Hora</th>
                                <th className="px-4 py-2 text-left">Personas</th>
                                <th className="px-4 py-2 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((r) => {
                                const dateObj = new Date(r.reservationTime);
                                const date = dateObj.toLocaleDateString();
                                const hour = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                return (
                                    <tr key={r.id} className="hover:bg-amber-50">
                                        <td className="px-4 py-2">{r.customer?.name || '-'}</td>
                                        <td className="px-4 py-2">{date}</td>
                                        <td className="px-4 py-2">{hour}</td>
                                        <td className="px-4 py-2">{r.reservationNumber}</td>
                                        <td className="px-4 py-2">
                                            {r.status === Status.CONFIRMED && <span className="text-green-600 font-semibold">Confirmada</span>}
                                            {r.status === Status.PENDING && <span className="text-yellow-600 font-semibold">Pendiente</span>}
                                            {r.status === Status.CANCELED && <span className="text-red-600 font-semibold">Cancelada</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
