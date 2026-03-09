export class User {
  constructor(data) {
    const safeData = data || {};

    this.id = String(safeData.id || "");
    this.name = safeData.name || "Usuário Sem Nome";
    this.email = safeData.email || "";
    this.role = safeData.role || "student";
    this.registration = safeData.registration || "Sem Matrícula";
    this.turma = safeData.turma || "---";
    this.schedule = safeData.schedule || null;

    this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      this.name
    )}&background=random&color=fff&size=128`;
  }

  isAdmin() {
    return this.role === "admin";
  }
}