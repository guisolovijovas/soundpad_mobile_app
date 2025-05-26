import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SoundpadProvider, useSoundpad } from "./src/context/SoundpadContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

// Componente interno para acessar o contexto e aplicar o tema
const ThemedApp = () => {
  const { theme, isLoadingConfig } = useSoundpad();

  if (isLoadingConfig) {
    // Mostrar loading enquanto as configurações (incluindo tema) são carregadas
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#4CAF50" : "#2E7D32"} />
        <Text style={{ color: theme === "dark" ? "#ccc" : "#555", marginTop: 10 }}>
          Carregando configurações...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* StatusBar pode ser estilizada com base no tema */}
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    // Envolve o aplicativo com o SoundpadProvider
    <SoundpadProvider>
      <ThemedApp />
    </SoundpadProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Fundo escuro padrão durante o loading inicial
  },
});

export default App;

