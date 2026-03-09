import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TicketUsedFeedback({ ticketId }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🍽️</Text>
      <Text style={styles.title}>Bom apetite!</Text>
      <Text style={styles.text}>Seu ticket já foi validado hoje.</Text>
      {ticketId && <Text style={styles.ticketId}>ID: {ticketId}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8f5e9",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
  ticketId: {
    fontSize: 10,
    color: "#999",
    marginTop: 10,
  },
});