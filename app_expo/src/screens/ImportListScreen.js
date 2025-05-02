import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useSoundpad } from '../context/SoundpadContext';

const ImportListScreen = ({ navigation }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('8000');
  const [isLoading, setIsLoading] = useState(false);
  const { connect, isConnected, getSoundLists } = useSoundpad();

  useEffect(() => {
    // Se já estiver conectado, redirecionar para a lista de sons
    if (isConnected) {
      navigation.navigate('SoundList');
    }
  }, [isConnected, navigation]);

  const handleImport = async () => {
    if (!ipAddress) {
      Alert.alert('Erro', 'Por favor, insira o endereço IP do seu PC');
      return;
    }

    setIsLoading(true);
    
    try {
      const connected = await connect(ipAddress, port);
      
      if (connected) {
        // Obter listas de sons após conectar
        await getSoundLists();
        
        Alert.alert(
          'Sucesso',
          'Conectado ao Soundpad com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SoundList')
            }
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível conectar ao Soundpad. Verifique se o servidor está rodando no PC.');
      }
    } catch (error) {
      Alert.alert('Erro', `Falha na conexão: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Importar Lista</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Para importar listas do Soundpad, insira o endereço IP do seu PC onde o Soundpad está instalado.
          Certifique-se de que ambos os dispositivos estejam conectados à mesma rede Wi-Fi.
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Endereço IP do PC</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 192.168.1.100"
            placeholderTextColor="#666"
            value={ipAddress}
            onChangeText={setIpAddress}
            keyboardType="numeric"
            editable={!isLoading}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Porta (padrão: 8000)</Text>
          <TextInput
            style={styles.input}
            placeholder="8000"
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
              <Text style={styles.buttonText}>Conectar e Importar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
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
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
  },
  importButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImportListScreen;
