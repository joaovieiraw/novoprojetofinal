import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function TicketButton({
  hasTicketToday,
  marketStatus,
  requesting,
  onRequestTicket,
}) {
  const isOpen = marketStatus?.isOpen;

  const disabled = requesting || hasTicketToday || !isOpen;

  let buttonText = "Solicitar Merenda";

  if (requesting) {
    buttonText = "Solicitando...";
  } else if (hasTicketToday) {
    buttonText = "Ticket já gerado hoje";
  } else if (!isOpen) {
    buttonText = "Fora do horário";
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.buttonDisabled : styles.buttonEnabled,
      ]}
      onPress={onRequestTicket}
      disabled={disabled}
    >
      {requesting ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnabled: {
    backgroundColor: "#00c853",
  },
  buttonDisabled: {
    backgroundColor: "#b0bec5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});