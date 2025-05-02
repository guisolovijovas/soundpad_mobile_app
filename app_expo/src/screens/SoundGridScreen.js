import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useSoundpad } from '../context/SoundpadContext';
import SoundGrid from '../components/SoundGrid';

const SoundGridScreen = ({ route, navigation }) => {
  const { listId, listName } = route.params;
  const { isConnected, currentList, getSoundsFromList, playSound, stopSound, isPlaying, currentSound } = useSoundpad();
  const [sounds, setSounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      loadSounds();
    } else {
      // Se não estiver conectado, redirecionar para a tela de importação
      navigation.replace('ImportList');
    }
  }, [isConnected]);

  useEffect(() => {
    if (currentList) {
      setSounds(currentList.sounds || []);
    }
  }, [currentList]);

  const loadSounds = async () => {
    setIsLoading(true);
    try {
      await getSoundsFromList(listId);
    } catch (error) {
      Alert.alert('Erro', `Falha ao carregar sons: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySound = async (soundIndex) => {
    try {
      await playSound(soundIndex);
    } catch (error) {
      Alert.alert('Erro', `Falha ao reproduzir som: ${error.message}`);
    }
  };

  const handleStopSound = async () => {
    try {
      await stopSound();
    } catch (error) {
      Alert.alert('Erro', `Falha ao parar som: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{listName}</Text>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Carregando sons...</Text>
        </View>
      ) : (
        <SoundGrid 
          sounds={sounds}
          currentSound={currentSound}
          isPlaying={isPlaying}
          onSoundPress={handlePlaySound}
        />
      )}
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.stopButton}
          onPress={handleStopSound}
        >
          <Text style={styles.buttonText}>Parar</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#607D8B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SoundGridScreen;
