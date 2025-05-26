import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { useSoundpad } from "../context/SoundpadContext";

const ImportListScreen = ({ navigation }) => {
  const { connect, isConnected, getSoundLists, serverConfig, isLoadingConfig } = useSoundpad();
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Preencher campos com a configuração salva quando carregada
    if (!isLoadingConfig && serverConfig) {
      setIpAddress(serverConfig.ipAddress || "");
      setPort(serverConfig.port || "8000");
    }
  }, [serverConfig, isLoadingConfig]);

  useEffect(() => {
    // Se já estiver conectado, redirecionar para a lista de sons
    // (Pode ser removido se quisermos permitir reconectar daqui)
    // if (isConnected) {
    //   navigation.navigate("SoundList");
    // }
  }, [isConnected, navigation]);

  const handleImport = async () => {
    const ipToConnect = ipAddress || serverConfig.ipAddress;
    const portToConnect = port || serverConfig.port || "8000";

    if (!ipToConnect) {
      Alert.alert("Erro", "Por favor, insira o endereço IP do seu PC ou configure-o nas Configurações.");
      return;
    }

    setIsLoading(true);
    
    try {
      // A função connect agora salva a config automaticamente se for bem-sucedida
      const connected = await connect(ipToConnect, portToConnect);
      
      if (connected) {
        // Obter listas de sons após conectar
        await getSoundLists();
        
        Alert.alert(
          "Sucesso",
          "Conectado ao Soundpad com sucesso!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("SoundList")
            }
          ]
        );
      } else {
        // A função connect já deve lançar um erro em caso de falha
        // Mas mantemos um fallback caso algo inesperado ocorra
        Alert.alert("Erro", "Não foi possível conectar ao Soundpad. Verifique o IP/Porta e se o servidor está rodando no PC.");
      }
    } catch (error) {
      Alert.alert("Erro", `Falha na conexão: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingConfig) {
    // Mostrar loading enquanto a config é carregada
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainerCentered}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Carregando configurações...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conectar ao Soundpad</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Insira o endereço IP e a porta do PC onde o servidor Soundpad está rodando, ou configure nas Configurações.
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Endereço IP do PC</Text>
          <TextInput
            style={styles.input}
            placeholder={serverConfig.ipAddress || "Ex: 192.168.1.100"}
            placeholderTextColor="#666"
            value={ipAddress}
            onChangeText={setIpAddress}
            keyboardType="numeric"
            editable={!isLoading}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Porta (padrão: {serverConfig.port || "8000"})</Text>
          <TextInput
            style={styles.input}
            placeholder={serverConfig.port || "8000"}
            placeholderTextColor="#666"
            value={port}
            onChangeText={setPort}
            keyboardType="numeric"
            editable={!isLoading}
          />
        </View>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Conectando ao Soundpad...</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.importButton}
              onPress={handleImport}
            >
              <Text style={styles.buttonText}>Conectar e Importar Listas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => navigation.navigate("Settings")}
            >
              <Text style={styles.buttonText}>Ir para Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 30,
    lineHeight: 22,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  loadingContainerCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
  },
  importButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  settingsButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ImportListScreen;

