import React, { useContext } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppContext } from "../context/AppContext";
import LoginScreen from "../views/LoginScreen";
import StudentHome from "../views/StudentHome";
import AdminHome from "../views/AdminHome";
import UserHeader from "../components/UserHeader";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loadingGlobal } = useContext(AppContext);

  if (loadingGlobal) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5F7FB",
        }}
      >
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : user.role === "admin" ? (
          <Stack.Screen
            name="AdminHome"
            component={AdminHome}
            options={{
              title: "Painel Admin",
              headerTitleAlign: "left",
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "#B71C1C",
              },
              headerRight: () => <UserHeader />,
              headerStyle: {
                height: Platform.OS === "web" ? 90 : 100,
              },
              headerShadowVisible: true,
            }}
          />
        ) : (
          <Stack.Screen
            name="StudentHome"
            component={StudentHome}
            options={{
              title: "Ticket Digital",
              headerTitleAlign: "left",
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "#004D40",
              },
              headerRight: () => <UserHeader />,
              headerStyle: {
                height: Platform.OS === "web" ? 90 : 100,
              },
              headerShadowVisible: true,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}