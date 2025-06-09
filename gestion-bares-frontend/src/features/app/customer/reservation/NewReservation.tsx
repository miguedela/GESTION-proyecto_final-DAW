import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loadRestaurant } from '../../../../api/restaurants.api';
import { breadcrumbsAtom } from '../../../../atoms/breadcrumbs.atom';
import { userAtom } from '../../../../atoms/user.atom';
import { Input, Select } from '../../../../components/Forms';
import { showErrorToast } from '../../../../components/ToastUtils';
import useReservation from '../../../../hooks/useReservation';
import { IReservation, Status } from '../../../../types/Reservation';
import { IRestaurant } from '../../../../types/Restaurants';

const reservationSchema = z.object({
  reservationDate: z.string().min(1, "La fecha es obligatoria"),
  reservationHour: z.string().min(1, "La hora es obligatoria"),
  reservationNumber: z.string().min(1, "El número de personas es obligatorio").refine(val => Number(val) > 0, "Debe ser al menos 1 persona"),
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
    const [startH, startM] = start.split(":").map(Number);
    let [endH, endM] = end.split(":").map(Number);

    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return;

    if (endH === 0 || endH === 24) endH = 24; // Normalize end time

    let currentH = startH;
    let currentM = startM;

    while (currentH < endH || (currentH === endH && currentM < endM)) {
      options.push(`${currentH.toString().padStart(2, '0')}:${currentM.toString().padStart(2, '0')}`);

      // Increment by 1 hour
      currentH += 1;
      if (currentH === endH && currentM === 30) break; // Stop at the end time
    }
  });

  return Array.from(new Set(options)).sort();
}

export const NewReservation = () => {
  const [restaurantId] = useState(localStorage.getItem("restaurantId"));

  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationHour, setReservationHour] = useState('');
  const [reservationNumber, setReservationNumber] = useState('1');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [openingHoursParsed, setOpeningHoursParsed] = useState<string[][][]>([]);
  const [closedDays, setClosedDays] = useState<number[]>([]);

  const { handleCreateReservation, loading } = useReservation();

  const fetchRestaurant = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const response = await loadRestaurant(restaurantId);
      const rest = response.data;
      setRestaurant(rest);
      if (rest.openingHours) {
        const parsed = parseOpeningHours(rest.openingHours);
        setOpeningHoursParsed(parsed);
      }
    } catch (err) {
      console.error("Error loading restaurant: ", err);
      navigate("/main");
    }
  }, [restaurantId, navigate]);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: "Restaurantes", path: "/main" },
      { label: `${restaurant?.name || ''}`, path: `/restaurant` },
      { label: "Hacer reserva", path: `/restaurant/reservation/new` },
    ]);
  }, [restaurantId, restaurant, setBreadcrumbs]);

  useEffect(() => {
    if (!user && restaurantId) navigate(`/restaurant`);
    else if (!restaurantId) navigate("/main");
    else fetchRestaurant();
  }, [restaurantId, user, navigate, fetchRestaurant]);

  useEffect(() => {
    if (restaurant?.openingHours) {
      const parsed = parseOpeningHours(restaurant.openingHours);
      setOpeningHoursParsed(parsed);
      const closed = parsed
        .map((franjas, idx) => (franjas.length === 0 ? idx : null))
        .filter((idx): idx is number => idx !== null);
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
    const franjas = openingHoursParsed[idx] || [];
    if (franjas.length === 0) {
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
        showErrorToast("El restaurante está cerrado ese día.");
        setReservationDate('');
        setAvailableHours([]);
        setReservationHour('');
        return;
      }
      setFormError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const result = reservationSchema.safeParse({
      reservationDate,
      reservationHour,
      reservationNumber,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    const reservationTime = new Date(`${reservationDate}T${reservationHour}`);
    const newReservation: IReservation = {
      customer: user,
      restaurant: restaurant!,
      reservationNumber: Number(reservationNumber),
      status: Status.PENDING,
      reservationTime,
    };

    const res = await handleCreateReservation(newReservation);
    if (res) {
      navigate(`/reservations`);
    }
  };

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isClosed = reservationDate && availableHours.length === 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-amber-600">
        Nueva Reserva en {restaurant?.name || "..."}
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
        <button
          type="submit"
          className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
          disabled={!!loading || !!isClosed}
        >
          {loading ? "Creando..." : "Reservar"}
        </button>
      </form>
    </div>
  );
};
