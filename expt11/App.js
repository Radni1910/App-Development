// App.js
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CatScreen } from "./screens/CatScreen";


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CatScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


