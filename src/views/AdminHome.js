import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { getStudents, getTickets } from "../services/api";

export default function AdminHome() {
  const { user, logout } = useContext(AppContext);

  const [students, setStudents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      const studentsData = await getStudents();
      const ticketsData = await getTickets();

      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setTickets(Array.isArray(ticketsData) ? ticketsData : []);

      console.log("Alunos:", studentsData);
      console.log("Tickets:", ticketsData);
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
      setStudents([]);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Administrador</Text>
      <Text style={styles.subtitle}>Olá, {user?.name}!</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Alunos: {students.length}</Text>
        <Text style={styles.infoText}>Tickets: {tickets.length}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#d32f2f" style={styles.loader} />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item, index) => String(item?.id ?? index)}
          contentContainerStyle={{ paddingBottom: 16 }}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {item?.name || item?.nome || "Sem nome"}
              </Text>

              <Text style={styles.cardText}>
                Matrícula: {item?.registration || item?.matricula || "---"}
              </Text>

              <Text style={styles.cardText}>
                Email: {item?.email || "---"}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum aluno encontrado.</Text>
          }
        />
      )}

      <TouchableOpacity style={styles.reloadButton} onPress={fetchData}>
        <Text style={styles.reloadText}>Atualizar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffebee",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#b71c1c",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#c62828",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 4,
    fontWeight: "600",
  },
  loader: {
    marginTop: 30,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#d32f2f",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
    fontSize: 15,
  },
  reloadButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 10,
  },
  reloadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#424242",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});