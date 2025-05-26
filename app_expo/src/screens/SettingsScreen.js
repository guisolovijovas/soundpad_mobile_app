import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView, Switch } from "react-native";
import { useSoundpad } from "../context/SoundpadContext";


const SettingsScreen = ({ navigation }) => {
  const { 
    serverConfig, 
    saveServerConfig, 
    disconnect, 
    isConnected, 
    theme, 
    saveTheme, 
    buttonSize, 
    saveButtonSize 
  } = useSoundpad();
  
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    // Preencher os campos com a configuração atual
    if (serverConfig) {
      setIpAddress(serverConfig.ipAddress || "");
      setPort(serverConfig.port || "8000");
    }
  }, [serverConfig]);

  const handleSaveConfig = async () => {
    if (!ipAddress) {
      Alert.alert("Erro", "Por favor, insira um endereço IP válido.");
      return;
    }
    const newConfig = { ipAddress, port: port || "8000" };
    await saveServerConfig(newConfig);
    Alert.alert("Sucesso", "Configurações do servidor salvas!");
    // Se estiver conectado, desconectar para forçar reconexão com novas configs
    if (isConnected) {
      disconnect();
      Alert.alert("Aviso", "Você foi desconectado para aplicar as novas configurações. Por favor, reconecte.");
      navigation.navigate("ImportList"); // Redirecionar para reconectar
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    saveTheme(newTheme);
  };

  const handleButtonSizeChange = (newSize) => {
    saveButtonSize(newSize);
  };

  // Define styles based on theme
  const themedStyles = getThemedStyles(theme);

  return (
    <SafeAreaView style={themedStyles.container}>
      <View style={themedStyles.header}>
        <Text style={themedStyles.title}>Configurações</Text>
      </View>
      
      <ScrollView style={themedStyles.content}>
        {/* --- Conexão com o Servidor --- */}
        <Text style={themedStyles.sectionTitle}>Conexão com o Servidor</Text>
        <View style={styles.inputContainer}>
          <Text style={themedStyles.label}>Endereço IP do Servidor</Text>
          <TextInput
            style={themedStyles.input}
            placeholder="Ex: 192.168.1.100"
            placeholderTextColor={theme === 'dark' ? "#666" : "#999"}
            value={ipAddress}
            onChangeText={setIpAddress}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={themedStyles.label}>Porta do Servidor</Text>
          <TextInput
            style={themedStyles.input}
            placeholder="8000"
            placeholderTextColor={theme === 'dark' ? "#666" : "#999"}
            value={port}
            onChangeText={setPort}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme === 'dark' ? "#4CAF50" : "#2E7D32" }]}
          onPress={handleSaveConfig}
        >
          <Text style={styles.buttonText}>Salvar Configurações</Text>
        </TouchableOpacity>

        {/* --- Aparência --- */}
        <Text style={themedStyles.sectionTitle}>Aparência</Text>
        <View style={styles.settingItem}>
          <Text style={themedStyles.label}>Tema Escuro</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={theme === "dark" ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={theme === "dark"}
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={themedStyles.label}>Tamanho dos Botões</Text>
          {/* Usando botões simples para alternar o tamanho */}
          <View style={styles.buttonSizeSelector}>
            <TouchableOpacity 
              style={[styles.sizeButton, buttonSize === 'small' && styles.sizeButtonSelected, { backgroundColor: theme === 'dark' ? (buttonSize === 'small' ? '#2196F3' : '#555') : (buttonSize === 'small' ? '#2196F3' : '#ccc')}] }
              onPress={() => handleButtonSizeChange('small')}
            >
              <Text style={[themedStyles.label, buttonSize === 'small' && styles.sizeButtonTextSelected]}>P</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sizeButton, buttonSize === 'medium' && styles.sizeButtonSelected, { backgroundColor: theme === 'dark' ? (buttonSize === 'medium' ? '#2196F3' : '#555') : (buttonSize === 'medium' ? '#2196F3' : '#ccc')}] }
              onPress={() => handleButtonSizeChange('medium')}
            >
              <Text style={[themedStyles.label, buttonSize === 'medium' && styles.sizeButtonTextSelected]}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sizeButton, buttonSize === 'large' && styles.sizeButtonSelected, { backgroundColor: theme === 'dark' ? (buttonSize === 'large' ? '#2196F3' : '#555') : (buttonSize === 'large' ? '#2196F3' : '#ccc')}] }
              onPress={() => handleButtonSizeChange('large')}
            >
              <Text style={[themedStyles.label, buttonSize === 'large' && styles.sizeButtonTextSelected]}>G</Text>
            </TouchableOpacity>
          </View>
          {/* Alternativa com Picker:
          <Picker
            selectedValue={buttonSize}
            style={{ height: 50, width: 150, color: themedStyles.label.color }}
            onValueChange={(itemValue) => handleButtonSizeChange(itemValue)}
          >
            <Picker.Item label="Pequeno" value="small" />
            <Picker.Item label="Médio" value="medium" />
            <Picker.Item label="Grande" value="large" />
          </Picker> */}
        </View>

        {/* --- Sobre --- */}
        <TouchableOpacity 
          style={[styles.aboutButton, { backgroundColor: theme === 'dark' ? "#607D8B" : "#455A64" }]}
          onPress={() => Alert.alert("Sobre", "Soundpad Mobile v1.1\nDesenvolvido por Manus")}
        >
          <Text style={styles.buttonText}>Sobre o Aplicativo</Text>
        </TouchableOpacity>

      </ScrollView>
      
      <View style={themedStyles.footer}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme === 'dark' ? "#607D8B" : "#455A64" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Função para obter estilos baseados no tema
const getThemedStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? "#121212" : "#f5f5f5",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme === 'dark' ? "#333" : "#ccc",
    backgroundColor: theme === 'dark' ? "#1e1e1e" : "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme === 'dark' ? "#fff" : "#000",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme === 'dark' ? "#ccc" : "#555",
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme === 'dark' ? "#444" : "#ddd",
    paddingBottom: 5,
  },
  label: {
    color: theme === 'dark' ? "#fff" : "#000",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme === 'dark' ? "#333" : "#eee",
    color: theme === 'dark' ? "#fff" : "#000",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: theme === 'dark' ? "#333" : "#ccc",
    backgroundColor: theme === 'dark' ? "#1e1e1e" : "#fff",
  },
});

// Estilos que não dependem do tema
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  saveButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444", // Cor padrão, será sobrescrita pelo tema se necessário
  },
  buttonSizeSelector: {
    flexDirection: 'row',
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sizeButtonSelected: {
    // backgroundColor: '#2196F3', // Cor movida para inline style
  },
  sizeButtonTextSelected: {
    color: '#fff', // Cor do texto quando selecionado
    fontWeight: 'bold',
  },
  aboutButton: {
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  backButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;

