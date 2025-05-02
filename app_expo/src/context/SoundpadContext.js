import React, { createContext, useState, useContext, useEffect } from 'react';
import SoundpadService from '../services/SoundpadService';
import { Alert } from 'react-native';

// Criando o contexto
const SoundpadContext = createContext();

// Provider do contexto
export const SoundpadProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [soundLists, setSoundLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverConfig, setServerConfig] = useState({
    ipAddress: '',
    port: '8000'
  });

  // Conectar ao servidor Soundpad
  const connect = async (ipAddress, port) => {
    setIsLoading(true);
    try {
      console.log(`Tentando conectar ao servidor: ${ipAddress}:${port}`);
      const connected = await SoundpadService.connect(ipAddress, port);
      setIsConnected(connected);
      setServerConfig({ ipAddress, port });
      console.log('Conexão bem-sucedida:', connected);
      return connected;
    } catch (error) {
      console.error('Erro ao conectar:', error.message);
      Alert.alert('Erro de Conexão', `Não foi possível conectar ao servidor: ${error.message}`);
      setIsConnected(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Desconectar do servidor
  const disconnect = async () => {
    setIsLoading(true);
    try {
      await SoundpadService.disconnect();
      setIsConnected(false);
      setCurrentList(null);
      setCurrentSound(null);
      setIsPlaying(false);
    } catch (error) {
      console.error('Erro ao desconectar:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Obter listas de sons
  const getSoundLists = async () => {
    setIsLoading(true);
    try {
      console.log('Obtendo listas de sons...');
      const categories = await SoundpadService.getCategories(true, false);
      console.log(`Recebidas ${categories ? categories.length : 0} categorias`);
      setSoundLists(categories || []);
      return categories || [];
    } catch (error) {
      console.error('Erro ao obter listas de sons:', error.message);
      Alert.alert('Erro', `Falha ao obter listas de sons: ${error.message}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Obter sons de uma lista específica
  const getSoundsFromList = async (listId) => {
    setIsLoading(true);
    try {
      console.log(`Obtendo sons da lista ${listId}...`);
      const list = await SoundpadService.getCategoryJSON(listId, true, false);
      setCurrentList(list);
      return list;
    } catch (error) {
      console.error('Erro ao obter sons da lista:', error.message);
      Alert.alert('Erro', `Falha ao obter sons da lista: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Reproduzir um som
  const playSound = async (index) => {
    try {
      console.log(`Reproduzindo som ${index}...`);
      const result = await SoundpadService.playSound(index);
      setIsPlaying(true);
      setCurrentSound(index);
      return result;
    } catch (error) {
      console.error('Erro ao reproduzir som:', error.message);
      Alert.alert('Erro', `Falha ao reproduzir som: ${error.message}`);
      return false;
    }
  };

  // Parar a reprodução
  const stopSound = async () => {
    try {
      console.log('Parando reprodução...');
      const result = await SoundpadService.stopSound();
      setIsPlaying(false);
      setCurrentSound(null);
      return result;
    } catch (error) {
      console.error('Erro ao parar som:', error.message);
      return false;
    }
  };

  // Obter status de reprodução
  const getPlayStatus = async () => {
    try {
      const status = await SoundpadService.getPlayStatus();
      setIsPlaying(status === 'PLAYING');
      return status;
    } catch (error) {
      console.error('Erro ao obter status de reprodução:', error.message);
      return null;
    }
  };

  // Verificar status de conexão periodicamente
  useEffect(() => {
    let statusInterval;
    
    if (isConnected && serverConfig.ipAddress) {
      statusInterval = setInterval(async () => {
        try {
          const status = await SoundpadService.isConnectedToSoundpad();
          if (isConnected !== status) {
            setIsConnected(status);
          }
        } catch (error) {
          console.log('Erro ao verificar status de conexão:', error.message);
          setIsConnected(false);
        }
      }, 10000); // Verificar a cada 10 segundos
    }
    
    return () => {
      if (statusInterval) {
        clearInterval(statusInterval);
      }
    };
  }, [isConnected, serverConfig]);

  return (
    <SoundpadContext.Provider
      value={{
        isConnected,
        soundLists,
        currentList,
        isPlaying,
        currentSound,
        isLoading,
        serverConfig,
        connect,
        disconnect,
        getSoundLists,
        getSoundsFromList,
        playSound,
        stopSound,
        getPlayStatus
      }}
    >
      {children}
    </SoundpadContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useSoundpad = () => {
  const context = useContext(SoundpadContext);
  if (!context) {
    throw new Error('useSoundpad deve ser usado dentro de um SoundpadProvider');
  }
  return context;
};
