import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingGlobal, setLoadingGlobal] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storadUser = await AsyncStorage.getItem("@ticket:user");

        if (storadUser) {
          const parsedJson = JSON.parse(storadUser);
          const userInstance = new User(parsedJson);
          setUser(userInstance);
        }
      } catch (error) {
        console.log("Erro ao recuperar dados do storage:", error);
      } finally {
        setLoadingGlobal(false);
      }
    }

    loadStorageData();
  }, []);

  async function login(userData) {
    try {
      const userInstance = userData instanceof User ? userData : new User(userData);
      setUser(userInstance);
      await AsyncStorage.setItem("@ticket:user", JSON.stringify(userInstance));
    } catch (error) {
      console.log("Erro ao salvar usuário:", error);
    }
  }

  async function logout() {
    try {
      setUser(null);
      await AsyncStorage.removeItem("@ticket:user");
    } catch (error) {
      console.log("Erro ao remover usuário:", error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loadingGlobal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};