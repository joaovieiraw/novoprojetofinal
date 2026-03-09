import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ClockStatus({
  currentTime,
  marketStatus,
  hasTicketToday,
}) {
  const isOpen = marketStatus?.isOpen;

  return (
    <View style={styles.container}>
      <Text style={styles.clockLabel}>Horário atual</Text>
      <Text style={styles.clock}>{currentTime}</Text>

      <View
        style={[
          styles.statusBox,
          { backgroundColor: isOpen ? "#e8f5e9" : "#ffebee" },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { color: isOpen ? "#2e7d32" : "#c62828" },
          ]}
        >
          {marketStatus?.message || "Verificando horário..."}
        </Text>
      </View>

      {hasTicketToday && (
        <Text style={styles.ticketInfo}>
          Você já possui um ticket gerado para hoje.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    marginBottom: 16,
    alignItems: "center",
  },
  clockLabel: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  clock: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 14,
  },
  statusBox: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  ticketInfo: {
    marginTop: 12,
    fontSize: 14,
    color: "#1565c0",
    fontWeight: "600",
    textAlign: "center",
  },
});