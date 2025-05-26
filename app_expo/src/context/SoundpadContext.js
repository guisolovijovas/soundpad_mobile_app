import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SoundpadService from "../services/SoundpadService"; // Ajuste o nome se necessário

// Chaves para AsyncStorage
const SERVER_CONFIG_KEY = "@SoundpadMobile:serverConfig";
const THEME_KEY = "@SoundpadMobile:theme";
const BUTTON_SIZE_KEY = "@SoundpadMobile:buttonSize";

// Criando o contexto
const SoundpadContext = createContext();

// Provider do contexto
export const SoundpadProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [soundLists, setSoundLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [serverConfig, setServerConfig] = useState({
    ipAddress: "",
    port: "8000"
  });
  const [theme, setTheme] = useState("dark"); // 'dark' ou 'light'
  const [buttonSize, setButtonSize] = useState("medium"); // 'small', 'medium', 'large'
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  // Carregar configurações salvas ao iniciar
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedConfig = await AsyncStorage.getItem(SERVER_CONFIG_KEY);
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        const savedButtonSize = await AsyncStorage.getItem(BUTTON_SIZE_KEY);

        if (savedConfig) {
          setServerConfig(JSON.parse(savedConfig));
        }
        if (savedTheme) {
          setTheme(savedTheme);
        }
        if (savedButtonSize) {
          setButtonSize(savedButtonSize);
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      } finally {
        setIsLoadingConfig(false);
      }
    };
    loadSettings();
  }, []);

  // Salvar configuração do servidor
  const saveServerConfig = async (newConfig) => {
    try {
      await AsyncStorage.setItem(SERVER_CONFIG_KEY, JSON.stringify(newConfig));
      setServerConfig(newConfig);
      console.log("Configuração do servidor salva:", newConfig);
    } catch (error) {
      console.error("Erro ao salvar configuração do servidor:", error);
    }
  };

  // Salvar tema
  const saveTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setTheme(newTheme);
      console.log("Tema salvo:", newTheme);
    } catch (error) {
      console.error("Erro ao salvar tema:", error);
    }
  };

  // Salvar tamanho dos botões
  const saveButtonSize = async (newSize) => {
    try {
      await AsyncStorage.setItem(BUTTON_SIZE_KEY, newSize);
      setButtonSize(newSize);
      console.log("Tamanho dos botões salvo:", newSize);
    } catch (error) {
      console.error("Erro ao salvar tamanho dos botões:", error);
    }
  };

  // Conectar ao servidor Soundpad
  const connect = async (ipAddress, port) => {
    const ipToUse = ipAddress || serverConfig.ipAddress;
    const portToUse = port || serverConfig.port;

    if (!ipToUse) {
      throw new Error("Endereço IP não fornecido ou configurado.");
    }

    try {
      await SoundpadService.connect(ipToUse, portToUse);
      setIsConnected(true);
      // Salvar configuração bem-sucedida
      await saveServerConfig({ ipAddress: ipToUse, port: portToUse });
      return true;
    } catch (error) {
      console.error("Erro ao conectar:", error.message);
      setIsConnected(false);
      throw error; // Re-lançar o erro para a tela tratar
    }
  };

  // Desconectar do servidor
  const disconnect = () => {
    SoundpadService.disconnect();
    setIsConnected(false);
    setCurrentList(null);
    setCurrentSound(null);
    setIsPlaying(false);
    console.log("Desconectado.");
  };

  // Obter listas de sons
  const getSoundLists = async () => {
    if (!isConnected) throw new Error("Não conectado ao Soundpad");
    try {
      const categories = await SoundpadService.getCategories(true, false);
      setSoundLists(categories);
      return categories;
    } catch (error) {
      console.error("Erro ao obter listas de sons:", error.message);
      throw error;
    }
  };

  // Obter sons de uma lista específica
  const getSoundsFromList = async (listId) => {
    if (!isConnected) throw new Error("Não conectado ao Soundpad");
    try {
      const list = await SoundpadService.getCategoryJSON(listId, true, false);
      setCurrentList(list);
      return list;
    } catch (error) {
      console.error("Erro ao obter sons da lista:", error.message);
      throw error;
    }
  };

  // Reproduzir um som
  const playSound = async (index) => {
    if (!isConnected) throw new Error("Não conectado ao Soundpad");
    try {
      const result = await SoundpadService.playSound(index);
      setIsPlaying(true);
      setCurrentSound(index);
      return result;
    } catch (error) {
      console.error("Erro ao reproduzir som:", error.message);
      throw error;
    }
  };

  // Parar a reprodução
  const stopSound = async () => {
    if (!isConnected) throw new Error("Não conectado ao Soundpad");
    try {
      const result = await SoundpadService.stopSound();
      setIsPlaying(false);
      setCurrentSound(null);
      return result;
    } catch (error) {
      console.error("Erro ao parar som:", error.message);
      throw error;
    }
  };

  // Obter status de reprodução
  const getPlayStatus = async () => {
    if (!isConnected) throw new Error("Não conectado ao Soundpad");
    try {
      const status = await SoundpadService.getPlayStatus();
      setIsPlaying(status === "PLAYING");
      return status;
    } catch (error) {
      console.error("Erro ao obter status de reprodução:", error.message);
      return null;
    }
  };

  return (
    <SoundpadContext.Provider
      value={{
        isConnected,
        soundLists,
        currentList,
        isPlaying,
        currentSound,
        serverConfig,
        theme,
        buttonSize,
        isLoadingConfig,
        connect,
        disconnect,
        getSoundLists,
        getSoundsFromList,
        playSound,
        stopSound,
        getPlayStatus,
        saveServerConfig,
        saveTheme,
        saveButtonSize
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
    throw new Error("useSoundpad deve ser usado dentro de um SoundpadProvider");
  }
  return context;
};

