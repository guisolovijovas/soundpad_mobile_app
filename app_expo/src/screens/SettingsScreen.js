import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Endereço IP do Servidor</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Alterar</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Porta do Servidor</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Alterar</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Tema do Aplicativo</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Escuro</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Tamanho dos Botões</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Médio</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Conectar Automaticamente</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Ativado</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.aboutButton}
          onPress={() => {
            // Mostrar informações sobre o aplicativo
          }}
        >
          <Text style={styles.buttonText}>Sobre o Aplicativo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLabel: {
    fontSize: 16,
    color: '#fff',
  },
  settingButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  settingButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  aboutButton: {
    backgroundColor: '#607D8B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  backButton: {
    backgroundColor: '#607D8B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
