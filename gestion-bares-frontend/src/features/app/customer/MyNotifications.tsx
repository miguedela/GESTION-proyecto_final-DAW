import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { createNotification, loadNotificationsByReceiver, updateNotification } from "../../../api/notification.api";
import { getReservationById, updateReservation } from "../../../api/reservations.api";
import { getRestaurantsByStaff } from "../../../api/restaurantstaff.api";
import { userAtom } from "../../../atoms/user.atom";
import { showErrorToast, showSuccessToast } from "../../../components/ToastUtils";
import { INotification, StatusNotification } from "../../../types/Notification";
import { Status } from "../../../types/Reservation";

interface RestaurantNotifications {
  restaurantName: string;
  notifications: INotification[];
}

export const MyNotifications = () => {
  const [user] = useAtom(userAtom);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [restaurantNotifications, setRestaurantNotifications] = useState<RestaurantNotifications[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      if (user?.role === "STAFF") {
        const restaurantsResponse = await getRestaurantsByStaff(user.id);
        const restaurants = restaurantsResponse.data;
        const grouped: RestaurantNotifications[] = [];
        for (const restaurant of restaurants) {
          const restaurantName = restaurant.restaurantName || restaurant.name || "Restaurante";
          if (restaurant?.id) {
            try {
              const notifResponse = await loadNotificationsByReceiver(restaurant.id);
              const unreadNotifications = (notifResponse.data || []).filter(
                (n: INotification) => n.status === StatusNotification.UNREAD
              );
              if (unreadNotifications.length > 0) {
                grouped.push({
                  restaurantName,
                  notifications: unreadNotifications,
                });
              }
            } catch (err) {
              console.error(`Error loading notifications for restaurant ${restaurantName}:`, err);
            }
          }
        }
        setRestaurantNotifications(grouped);
      } else if (user?.role === "CUSTOMER" || user?.role === "ADMIN") {
        const response = await loadNotificationsByReceiver(user.id);
        setNotifications((response.data || []).filter(
          (n: INotification) => n.status === StatusNotification.UNREAD
        ));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleReservationAction = async (
    notification: INotification,
    action: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const reservationId = notification.reservationId !== null ? notification.reservationId : "";
      const res = await getReservationById(reservationId);
      const reservation = res.data;
      if (!reservation) {
        return;
      }
      const updatedReservation = {
        ...reservation,
        status: action === "ACCEPTED" ? Status.CONFIRMED : Status.CANCELED,
      };
      await updateReservation(updatedReservation);

      // Actualiza el estado de la notificación
      notification.status = StatusNotification.READ;
      await updateNotification(notification);

      // Elimina la notificación del estado local
      setNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );

      showSuccessToast(
        action === "ACCEPTED"
          ? "Reserva aceptada correctamente."
          : "Reserva rechazada correctamente."
      );
    } catch (err) {
      showErrorToast("Error al actualizar la reserva.");
    }
  };

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-amber-600 tracking-tight">Mis Notificaciones</h2>
      {loading && <div className="text-amber-600 text-center py-4">Cargando notificaciones...</div>}

      {user?.role === "STAFF" && !loading && restaurantNotifications.length === 0 && (
        <div className="text-gray-400 text-center py-8">No tienes notificaciones.</div>
      )}
      {user?.role === "STAFF" && !loading && restaurantNotifications.length > 0 && (
        <div className="space-y-8">
          {restaurantNotifications.map((group) => (
            <div key={group.restaurantName} className="">
              <h3 className="font-semibold text-lg text-amber-700 mb-3 border-b border-amber-100 pb-1 pl-1">{group.restaurantName}</h3>
              <ul className="space-y-3">
                {group.notifications.map((n) => (
                  <li key={n.id} className="bg-gray-50 rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Nueva reserva</span>
                    </div>
                    <div className="mt-3 md:mt-0 md:ml-4 flex gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg font-medium shadow-sm transition-colors"
                        onClick={() => handleReservationAction(n, "ACCEPTED")}
                      >
                        Aceptar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium shadow-sm transition-colors"
                        onClick={() => handleReservationAction(n, "REJECTED")}
                      >
                        Rechazar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {(user?.role === "CUSTOMER" || user?.role === "ADMIN") && !loading && notifications.length === 0 && (
        <div className="text-gray-400 text-center py-8">No tienes notificaciones.</div>
      )}
      {(user?.role === "CUSTOMER" || user?.role === "ADMIN") && !loading && notifications.length > 0 && (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li key={n.id} className="bg-gray-50 rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <CustomerNotificationItem notification={n} onRead={fetchNotifications} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomerNotificationItem = ({ notification, onRead }: { notification: INotification; onRead: () => void }) => {
  const [reservationStatus, setReservationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      setLoading(true);
      try {
        if (notification.reservationId) {
          const res = await getReservationById(notification.reservationId);
          const reservation = res.data;
          if (reservation) {
            setReservationStatus(reservation.status);
          }
        }
      } catch {
        setReservationStatus(null);
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [notification.reservationId]);

  const handleRead = async () => {
    await updateNotification({ ...notification, status: StatusNotification.READ });
    onRead();
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
      <div>
        <span className="font-semibold text-gray-700">Estado de tu reserva: </span>
        {loading && <span className="text-amber-600">Cargando...</span>}
        {!loading && reservationStatus === Status.CONFIRMED && (
          <span className="text-green-600 font-semibold">Aceptada</span>
        )}
        {!loading && reservationStatus === Status.CANCELED && (
          <span className="text-red-600 font-semibold">Rechazada</span>
        )}
        {!loading && !reservationStatus && (
          <span className="text-gray-400">No disponible</span>
        )}
      </div>
      <button
        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded-lg font-medium shadow-sm transition-colors mt-2 md:mt-0"
        onClick={handleRead}
      >
        Marcar como leída
      </button>
    </div>
  );
};