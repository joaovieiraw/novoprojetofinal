import axios from "axios";
import { User } from "../models/User";
import { Ticket } from "../models/Ticket";

const api = axios.create({
  baseURL: "https://these-aside-after-encountered.trycloudflare.com",
});

export default api;

// Buscar alunos
export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data.map((item) => new User(item));
  } catch (error) {
    console.error("Erro ao buscar alunos:", error?.response?.data || error.message);
    return [];
  }
};

// Buscar tickets
export const getTickets = async () => {
  try {
    const response = await api.get("/tickets");
    return response.data.map((item) => new Ticket(item));
  } catch (error) {
    console.error("Erro ao buscar tickets:", error?.response?.data || error.message);
    return [];
  }
};

// Login
export const loginRequest = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return new User(response.data);
  } catch (error) {
    console.log(
      "Tentativa de login falhou:",
      error?.response?.data || error.message
    );
    return null;
  }
};

// Verificar ticket do dia
export const checkTodayTicket = async (studentId) => {
  try {
    const response = await api.get(`/tickets/today/${studentId}`);

    if (!response.data) return null;

    return new Ticket(response.data);
  } catch (error) {
    console.log(
      "Erro ao verificar ticket do dia:",
      error?.response?.data || error.message
    );
    return null;
  }
};

// Solicitar novo ticket
export const requestNewTicket = async (studentId) => {
  try {
    const response = await api.post("/tickets", {
      student_id: studentId,
    });

    return new Ticket(response.data);
  } catch (error) {
    console.log(
      "Erro ao solicitar ticket:",
      error?.response?.data || error.message
    );
    return null;
  }
};