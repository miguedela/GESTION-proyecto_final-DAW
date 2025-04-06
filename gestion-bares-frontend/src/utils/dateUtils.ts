export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);

  const weekday = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(date);
  const day = new Intl.DateTimeFormat("es-ES", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(date);
  const year = new Intl.DateTimeFormat("es-ES", { year: "numeric" }).format(date);
  const hour = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", hour12: false }).format(date);
  const minute = new Intl.DateTimeFormat("es-ES", { minute: "2-digit" }).format(date);
  const second = new Intl.DateTimeFormat("es-ES", { second: "2-digit" }).format(date);

  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} de ${month} de ${year}, ${hour}:${minute}:${second}`;
}

export function formatDateShort(dateString: string | Date) {
  const date = new Date(dateString);

  const day = new Intl.DateTimeFormat("es-ES", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("es-ES", { month: "2-digit" }).format(date);
  const year = new Intl.DateTimeFormat("es-ES", { year: "numeric" }).format(date);
  const hour = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", hour12: false }).format(date);
  const minute = new Intl.DateTimeFormat("es-ES", { minute: "2-digit" }).format(date);

  return `${day}/${month}/${year}, ${hour}:${minute}`;
}
