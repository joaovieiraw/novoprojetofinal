import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function TicketQRCode({ ticketData }) {
  if (!ticketData) return null;

  const qrPayload = JSON.stringify({
    ticketId: ticketData.id,
    userId: ticketData.userId,
    generatedAt: ticketData.created_at,
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ticket Refeição</Text>

      <View style={styles.qrBorder}>
        <QRCode
          value={qrPayload}
          size={200}
          color="black"
          backgroundColor="white"
        />
      </View>

      <Text style={styles.hash}>ID: {ticketData.id}</Text>
      <Text style={styles.instruction}>
        Apresente este código na cantina
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    width: "100%",
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  qrBorder: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  hash: {
    marginTop: 15,
    fontSize: 12,
    color: "#999",
  },
  instruction: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
});