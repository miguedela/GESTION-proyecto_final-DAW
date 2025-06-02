import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAtom } from '../../../atoms/user.atom';
import useReservation from '../../../hooks/useReservation';
import { breadcrumbsAtom } from '../../../atoms/breadcrumbs.atom';
import { Status } from '../../../types/Reservation';

export const Reservations = () => {
  const [user] = useAtom(userAtom);
  const {
    reservations,
    loading,
    error,
    handleLoadReservationsByCustomer,
  } = useReservation();

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Reservas", path: "/reservations" },
    ]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    if (user?.id) {
      handleLoadReservationsByCustomer(user.id);
    }
  }, [user?.id]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-neutral-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">
        Mis Reservas
      </h2>
      {loading && <div className="text-amber-600">Cargando reservas...</div>}
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {!loading && reservations.length === 0 && (
        <div className="text-gray-600 dark:text-gray-300">No tienes reservas.</div>
      )}
      {!loading && reservations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Restaurante</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Hora</th>
                <th className="px-4 py-2 text-left">Personas</th>
                <th className="px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => {
                if (r.status === Status.CONFIRMED) {

                  const dateObj = new Date(r.reservationTime);
                  const date = dateObj.toLocaleDateString();
                  const hour = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <tr key={r.id} className="hover:bg-amber-50 dark:hover:bg-neutral-800">
                      <Link
                        to={`/reservation/${r.id}/update`}
                        className="text-amber-600 hover:underline"
                      >
                        <td className="px-4 py-2">
                          {r.restaurant?.name || '-'}
                        </td>
                      </Link>
                      <td className="px-4 py-2">{date}</td>
                      <td className="px-4 py-2">{hour}</td>
                      <td className="px-4 py-2">{r.reservationNumber}</td>
                      <td className="px-4 py-2">{r.status}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
