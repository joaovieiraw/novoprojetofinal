import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";

export default function StudentHeader() {
  const { user } = useContext(AppContext);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Digital</Text>
      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Turma: {user.turma || "Não informada"}
        </Text>
        <Text style={styles.infoText}>
          Intervalo: {user?.schedule?.start || "--:--"} às{" "}
          {user?.schedule?.end || "--:--"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004d40",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#f1f8f6",
    borderRadius: 12,
    padding: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
});