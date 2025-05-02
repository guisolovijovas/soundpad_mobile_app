import React from 'react';
import { Alert } from 'react-native';

class SoundpadRestService {
  constructor() {
    this.isConnected = false;
    this.serverUrl = null;
  }

  // Configurar URL do servidor
  setServerUrl(ipAddress, port = 8000) {
    this.serverUrl = `http://${ipAddress}:${port}`;
    return this.serverUrl;
  }

  // Conectar ao servidor
  async connect(ipAddress, port = 8000) {
    try {
      this.setServerUrl(ipAddress, port);
      
      const response = await fetch(`${this.serverUrl}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        this.isConnected = data.connected;
        console.log('Status de conexão com o Soundpad:', data.connected);
        return true;
      } else {
        throw new Error(data.error || 'Falha ao conectar');
      }
    } catch (error) {
      console.error('Erro ao conectar:', error.message);
      Alert.alert('Erro', error.message);
      this.isConnected = false;
      throw error;
    }
  }

  // Desconectar do servidor
  async disconnect() {
    if (!this.serverUrl) {
      return false;
    }
    
    try {
      const response = await fetch(`${this.serverUrl}/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      this.isConnected = false;
      return data;
    } catch (error) {
      console.error('Erro ao desconectar:', error.message);
      this.isConnected = false;
      return false;
    }
  }

  // Verificar status de conexão
  async checkStatus() {
    if (!this.serverUrl) {
      return false;
    }
    
    try {
      const response = await fetch(`${this.serverUrl}/status`);
      const data = await response.json();
      this.isConnected = data.connected;
      return data.connected;
    } catch (error) {
      console.error('Erro ao verificar status:', error.message);
      this.isConnected = false;
      return false;
    }
  }

  // Obter lista de sons
  async getSoundList() {
    if (!this.serverUrl || !this.isConnected) {
      throw new Error('Não conectado ao servidor');
    }
    
    try {
      const response = await fetch(`${this.serverUrl}/sounds`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao obter lista de sons');
      }
      
      const data = await response.json();
      return data.sounds;
    } catch (error) {
      console.error('Erro ao obter lista de sons:', error.message);
      throw error;
    }
  }

  // Obter categorias
  async getCategories(withSounds = false, withIcons = false) {
    if (!this.serverUrl || !this.isConnected) {
      throw new Error('Não conectado ao servidor');
    }
    
    try {
      const url = new URL(`${this.serverUrl}/categories`);
      url.searchParams.append('withSounds', withSounds);
      url.searchParams.append('withIcons', withIcons);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao obter categorias');
      }
      
      const data = await response.json();
      return data.categories;
    } catch (error) {
      console.error('Erro ao obter categorias:', error.message);
      throw error;
    }
  }

  // Obter categoria específica
  async getCategoryJSON(index, withSounds = false, withIcons = false) {
    if (!this.serverUrl || !this.isConnected) {
      throw new Error('Não conectado ao servidor');
    }
    
    try {
      // Como não temos um endpoint específico para uma categoria,
      // vamos obter todas e filtrar
      const categories = await this.getCategories(withSounds, withIcons);
      const category = categories.find(cat => cat.index === index);
      
      if (!category) {
        throw new Error('Categoria não encontrada');
      }
      
      return category;
    } catch (error) {
      console.error('Erro ao obter categoria:', error.message);
      throw error;
    }
  }

  // Reproduzir som
  async playSound(index, renderLine = true, captureLine = true) {
    if (!this.serverUrl || !this.isConnected) {
      throw new Error('Não conectado ao servidor');
    }
    
    try {
      const response = await fetch(`${this.serverUrl}/play`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, renderLine, captureLine }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao reproduzir som');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao reproduzir som:', error.message);
      throw error;
    }
  }

  // Parar reprodução
  async stopSound() {
    if (!this.serverUrl || !this.isConnected) {
      throw new Error('Não conectado ao servidor');
    }
    
    try {
      const response = await fetch(`${this.serverUrl}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao parar som');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao parar som:', error.message);
      throw error;
    }
  }

  // Obter status de reprodução
  async getPlayStatus() {
    if (!this.serverUrl || !this.isConnected) {
      throw new Error('Não conectado ao servidor');
    }
    
    try {
      const response = await fetch(`${this.serverUrl}/play-status`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao obter status de reprodução');
      }
      
      const data = await response.json();
      return data.status;
    } catch (error) {
      console.error('Erro ao obter status de reprodução:', error.message);
      throw error;
    }
  }

  // Verificar se está conectado
  isConnectedToSoundpad() {
    return this.isConnected;
  }
}

// Exportar uma instância única do serviço
export default new SoundpadRestService();
