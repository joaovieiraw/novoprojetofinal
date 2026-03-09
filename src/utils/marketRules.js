export const checkMarketStatus = (user) => {
  if (user.role === "admin") {
    return { isOpen: true, message: "Modo Admin (Sempre Aberto)" };
  }

  if (!user.schedule || !user.schedule.start || !user.schedule.end) {
    return { isOpen: false, message: "Sem horário definido" };
  }

  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  const [startH, startM] = user.schedule.start.split(":").map(Number);
  const [endH, endM] = user.schedule.end.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  const openTime = startMinutes - 10;

  const isOpen =
    currentTotalMinutes >= openTime && currentTotalMinutes < endMinutes;

  let message = "Aguarde o horário oficial";

  if (isOpen) {
    if (currentTotalMinutes < startMinutes) {
      message = "Solicitação de Ticket Liberada!";
    } else {
      message = "Intervalo em andamento";
    }
  }

  return { isOpen, message };
};

export const formatTime = (date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};