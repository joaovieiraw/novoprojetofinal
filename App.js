import React from "react";
import { AppProvider } from "./src/context/AppContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  button onclick="adicionar(false)">Fila Normal</button>
<button onclick="adicionar(true)">Fila Preferencial</button>

  );
}
