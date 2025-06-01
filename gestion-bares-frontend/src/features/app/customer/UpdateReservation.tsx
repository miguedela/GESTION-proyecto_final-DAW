import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { userAtom } from '../../../atoms/user.atom';
import { Input, Select } from '../../../components/Forms';
import useReservation from '../../../hooks/useReservation';
import { Status } from '../../../types/Reservation';
import { IRestaurant } from '../../../types/Restaurants';
import { breadcrumbsAtom } from '../../../atoms/breadcrumbs.atom';

const reservationSchema = z.object({
  reservationDate: z.string().min(1, "La fecha es obligatoria"),
  reservationHour: z.string()
    .min(1, "La hora es obligatoria")
    .regex(/^([01]\d|2[0-3]):00$/, "Solo puedes seleccionar horas en punto (ej: 20:00, 21:00)"),
  reservationNumber: z.string()
    .min(1, "El número de personas es obligatorio")
    .refine(val => Number(val) > 0, "Debe ser al menos 1 persona"),
});

function parseOpeningHours(openingHours: string) {
  return openingHours.split(";").map(day =>
    day.trim() === "Cerrado"
      ? []
      : day.split(",").map(franja => franja.trim().split("–"))
  );
}

function generateHourOptions(franjas: string[][]) {
  const options: string[] = [];
  franjas.forEach(franja => {
    if (!franja || franja.length < 2) return;
    const [start, end] = franja;
    if (!start || !end) return;
    const [startH] = start.split(":").map(Number);
    let [endH] = end.split(":").map(Number);
    if (isNaN(startH) || isNaN(endH)) return;
    if (endH === 0 || endH === 24) endH = 24;
    for (let h = startH; h < endH; h++) {
      options.push(`${h.toString().padStart(2, '0')}:00`);
    }
  });
  return Array.from(new Set(options)).sort();
}

export const UpdateReservation = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationHour, setReservationHour] = useState('');
  const [reservationNumber, setReservationNumber] = useState('1');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [openingHoursParsed, setOpeningHoursParsed] = useState<string[][][]>([]);
  const [closedDays, setClosedDays] = useState<number[]>([]);

  const {
    handleUpdateReservation,
    handleGetReservationById,
    loading,
    error,
    reservation,
  } = useReservation();

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Reservas", path: "/reservations" },
      { label: "Actualizar reserva", path: `/reservation/${reservationId}/update` },
    ]);
  }, [setBreadcrumbs, reservationId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!reservationId) return;
      const data = await handleGetReservationById(reservationId);
      if (data) {
        setReservationDate(data.reservationTime.slice(0, 10));
        setReservationHour(
          new Date(data.reservationTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
        );
        setReservationNumber(data.reservationNumber.toString());
        setRestaurant(data.restaurant);
      }
    };
    fetchData();
  }, [reservationId]);

  useEffect(() => {
    if (restaurant?.openingHours) {
      const parsed = parseOpeningHours(restaurant.openingHours);
      setOpeningHoursParsed(parsed);
      const closed = parsed
        .map((franjas, idx) => (franjas.length === 0 ? idx : null))
        .filter(idx => idx !== null) as number[];
      setClosedDays(closed);
    }
  }, [restaurant]);

  useEffect(() => {
    if (!reservationDate || openingHoursParsed.length === 0) {
      setAvailableHours([]);
      return;
    }
    const date = new Date(reservationDate);
    const idx = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const franjas = openingHoursParsed[idx];
    if (!franjas || franjas.length === 0) {
      setAvailableHours([]);
      setReservationHour('');
      return;
    }
    const options = generateHourOptions(franjas);
    setAvailableHours(options);
    if (!options.includes(reservationHour)) setReservationHour('');
  }, [reservationDate, openingHoursParsed, reservationHour]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReservationDate(value);
    if (value) {
      const date = new Date(value);
      const jsDay = date.getDay();
      const idx = jsDay === 0 ? 6 : jsDay - 1;
      if (closedDays.includes(idx)) {
        setFormError("El restaurante está cerrado ese día.");
        setReservationDate('');
        setAvailableHours([]);
        setReservationHour('');
        return;
      } else {
        setFormError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);
    setFieldErrors({});

    const result = reservationSchema.safeParse({
      reservationDate,
      reservationHour,
      reservationNumber,
    });

    if (!restaurant) {
      setFormError("Restaurante no válido.");
      return;
    }
    if (!user) {
      setFormError("Debes iniciar sesión.");
      return;
    }

    if (!result.success) {
      const errors: { [k: string]: string } = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    const reservationTime = new Date(`${reservationDate}T${reservationHour}`);

    const updatedReservation = {
      ...reservation,
      customer: user,
      restaurant: restaurant,
      reservationNumber: Number(reservationNumber),
      status: reservation?.status || Status.PENDING,
      reservationTime,
    };

    const res = await handleUpdateReservation(updatedReservation);
    if (res && !error) {
      setSuccess(true);
      navigate(`/restaurant/${restaurant.id}`);
    }
  };

  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  const isClosed = reservationDate && availableHours.length === 0;

  if (!restaurant) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-900 rounded shadow">
        <div className="text-amber-600">Cargando restaurante...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">
        Editar Reserva en {restaurant?.name || "..."}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Fecha"
          id="reservationDate"
          type="date"
          value={reservationDate}
          onChange={handleDateChange}
          fieldErrors={fieldErrors.reservationDate}
          min={minDate}
        />
        <Select
          label="Hora"
          id="reservationHour"
          value={reservationHour}
          options={availableHours.map(h => ({ label: h, value: h }))}
          onChange={e => setReservationHour(e.target.value)}
          fieldErrors={fieldErrors.reservationHour}
          placeholderOption={isClosed ? "Cerrado" : "Selecciona una hora"}
          disabled={!!isClosed}
        />
        <Input
          label="Número de personas"
          id="reservationNumber"
          type="number"
          value={reservationNumber}
          onChange={e => setReservationNumber(e.target.value)}
          fieldErrors={fieldErrors.reservationNumber}
          min="1"
        />
        {isClosed && (
          <div className="text-red-600 font-semibold">
            El restaurante está cerrado ese día.
          </div>
        )}
        {formError && <div className="text-red-600 font-semibold">{formError}</div>}
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        {success && <div className="text-amber-600 font-semibold">¡Reserva actualizada con éxito!</div>}
        <button
          type="submit"
          className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
          disabled={!!loading || !!isClosed}
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
};