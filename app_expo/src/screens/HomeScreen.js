import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSoundpad } from '../context/SoundpadContext';

const HomeScreen = ({ navigation }) => {
  const { isConnected } = useSoundpad();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Soundpad Mobile</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Controle o Soundpad do seu PC diretamente pelo celular.
          Importe suas listas de sons e reproduza-os com facilidade.
        </Text>
        
        <TouchableOpacity 
          style={styles.importButton}
          onPress={() => navigation.navigate('ImportList')}
        >
          <Text style={styles.buttonText}>Importar Lista</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('SoundList')}
        >
          <Text style={styles.buttonText}>Ver Listas Importadas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Conectado ao Soundpad: {isConnected ? 'Sim' : 'Não'}
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
  },
  importButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  settingsButton: {
    backgroundColor: '#607D8B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
});

export default HomeScreen;
