export class Ticket {
  constructor(data) {
    const safeData = data || {};

    this.id = String(safeData.id || Date.now());
    this.userId = safeData.user_id || "";
    this.status = safeData.status || "VALIDO";
    this.createdAt = safeData.created_at || new Date().toISOString();
  }

  getStatusColor(isMarketOpen = true) {
    if (this.status === "USADO") return "#9E9E9E";
    if (this.status === "CANCELADO") return "#F44336";
    if (this.status === "VALIDO" && !isMarketOpen) return "#607d8b";
    if (this.status === "VALIDO") return "#4CAF50";
    return "#FFC107";
  }

  getStatusText(isMarketOpen = true) {
    switch (this.status) {
      case "USADO":
        return "Refeição Consumida";
      case "CANCELADO":
        return "Ticket Cancelado";
    }

    if (this.status === "VALIDO" && !isMarketOpen) {
      return "NÃO UTILIZADO (VENCIDO)";
    }

    if (this.status === "VALIDO") {
      return "Disponível para Uso";
    }

    return "Status Desconhecido";
  }
}