import { useState } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { requestNewTicket } from "../services/api";

import {
  getDistanceInMeters,
  SCHOOL_COORDS,
  MAX_DISTANCE_METERS,
} from "../utils/locationHelpers";

export function useSecureTicket() {
  const [loading, setLoading] = useState(false);

  const purchaseTicket = async (user, marketStatus, onSuccess) => {
    if (!marketStatus.isOpen) {
      Alert.alert("Aguarde", "Cantina fechada.");
      return;
    }

    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Precisamos do GPS para validar o ticket."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const distance = getDistanceInMeters(
        location.coords.latitude,
        location.coords.longitude,
        SCHOOL_COORDS.latitude,
        SCHOOL_COORDS.longitude
      );

      if (distance > MAX_DISTANCE_METERS) {
        Alert.alert(
          "Longe demais",
          `Aproxime-se da cantina. Distância: ${Math.round(distance)}m`
        );
        return;
      }

      const newTicket = await requestNewTicket(user.id);

      if (onSuccess) onSuccess(newTicket);

      Alert.alert("Sucesso!", "Ticket validado e gerado!");
    } catch (error) {
      const msg = error.response?.data?.error || "Erro ao processar pedido.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    purchaseTicket,
    loading,
  };
}