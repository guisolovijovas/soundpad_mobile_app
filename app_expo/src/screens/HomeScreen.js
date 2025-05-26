import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useSoundpad } from "../context/SoundpadContext"; // Import context

const HomeScreen = ({ navigation }) => {
  const { theme } = useSoundpad(); // Get theme from context
  const themedStyles = getThemedStyles(theme); // Get themed styles

  return (
    <SafeAreaView style={themedStyles.container}>
      <View style={themedStyles.header}>
        <Text style={themedStyles.title}>Soundpad Mobile</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={themedStyles.description}>
          Controle o Soundpad do seu PC diretamente pelo celular.
          Importe suas listas de sons e reproduza-os com facilidade.
        </Text>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme === 'dark' ? '#2196F3' : '#1976D2' }]}
          onPress={() => navigation.navigate("ImportList")}
        >
          <Text style={styles.buttonText}>Conectar / Importar Lista</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme === 'dark' ? '#4CAF50' : '#388E3C' }]}
          onPress={() => navigation.navigate("SoundList")}
        >
          <Text style={styles.buttonText}>Ver Listas Importadas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme === 'dark' ? '#607D8B' : '#455A64' }]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
      </View>
      
      <View style={themedStyles.footer}>
        <Text style={themedStyles.footerText}>v1.1</Text>
      </View>
    </SafeAreaView>
  );
};

// Function to get styles based on theme
const getThemedStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
  },
  header: {
    paddingVertical: 30, // Increased padding
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme === "dark" ? "#333" : "#ccc",
    backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
  },
  title: {
    fontSize: 28, // Increased font size
    fontWeight: "bold",
    color: theme === "dark" ? "#fff" : "#000",
  },
  description: {
    fontSize: 16,
    color: theme === "dark" ? "#ccc" : "#555",
    textAlign: "center",
    marginBottom: 40, // Increased margin
    lineHeight: 24,
  },
  footer: {
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: theme === "dark" ? "#333" : "#ccc",
    backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
  },
  footerText: {
    fontSize: 12,
    color: theme === "dark" ? "#888" : "#777",
  },
});

// Common styles
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center", // Center buttons vertically
    padding: 20,
  },
  button: {
    paddingVertical: 18, // Increased padding
    borderRadius: 8,
    marginBottom: 20, // Increased margin
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, // Increased font size
    fontWeight: "bold",
  },
});

export default HomeScreen;

