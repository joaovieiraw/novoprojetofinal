import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { AppContext } from "../context/AppContext";

import TicketQRCode from "../components/TicketQRCode";
import TicketUsedFeedback from "../components/TicketUsedFeedback";
import PurchaseLoading from "../components/PurchaseLoading";
import StudentFooter from "../components/Footer";
import TicketActionArea from "../components/TicketActionArea";

import { checkMarketStatus } from "../utils/marketRules";
import { checkTodayTicket } from "../services/api";
import { useSecureTicket } from "../viewmodels/useSecureTicket";

export default function StudentHome() {
  const { user, logout } = useContext(AppContext);

  const [marketStatus, setMarketStatus] = useState(checkMarketStatus(user));
  const [currentTicket, setCurrentTicket] = useState(null);

  const { purchaseTicket, loading } = useSecureTicket();

  async function loadTodayTicket() {
    const ticket = await checkTodayTicket(user.id);
    setCurrentTicket(ticket);
  }

  useEffect(() => {
    loadTodayTicket();
  }, []);

  const handlePressTicket = () => {
    purchaseTicket(user, marketStatus, (newTicket) => {
      setCurrentTicket(newTicket);
    });
  };

  const renderTicketArea = () => {
    if (loading) {
      return <PurchaseLoading message="Validando localização..." />;
    }

    if (!currentTicket) {
      return (
        <TicketActionArea
          loading={loading}
          onPress={handlePressTicket}
          isOpen={marketStatus.isOpen}
          hasTicket={false}
        />
      );
    }

    if (currentTicket.status === "USADO") {
      return <TicketUsedFeedback ticketId={currentTicket.id} />;
    }

    return <TicketQRCode ticketData={currentTicket} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {renderTicketArea()}

        <StudentFooter
          onLogout={logout}
          onChangePassword={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e0f7fa",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});