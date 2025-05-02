const express = require('express');
const cors = require('cors');
const soundpadjs = require('soundpad.js');

const app = express();
app.use(cors());
app.use(express.json());

// Instância do Soundpad
let soundpadInstance = null;
let isConnected = false;

// Middleware para verificar conexão
const checkConnection = (req, res, next) => {
  if (!soundpadInstance || !isConnected) {
    return res.status(400).json({ error: 'Não conectado ao Soundpad' });
  }
  next();
};

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor de integração Soundpad Mobile rodando!');
});

// Conectar ao Soundpad
app.post('/connect', async (req, res) => {
  try {
    if (!soundpadInstance) {
      // Verificando a estrutura da biblioteca
      console.log('Estrutura da biblioteca soundpad.js:', Object.keys(soundpadjs));
      
      // Tentando diferentes formas de criar a instância
      if (typeof soundpadjs === 'function') {
        soundpadInstance = new soundpadjs();
      } else if (soundpadjs.Soundpad) {
        soundpadInstance = new soundpadjs.Soundpad();
      } else if (soundpadjs.default) {
        soundpadInstance = new soundpadjs.default();
      } else {
        throw new Error('Não foi possível criar uma instância do Soundpad. Verifique a biblioteca.');
      }
    }
    
    if (!isConnected) {
      await soundpadInstance.connect();
      isConnected = true;
      console.log('Conectado ao Soundpad');
    }
    
    res.json({ connected: true });
  } catch (error) {
    console.error('Erro ao conectar ao Soundpad:', error.message);
    res.status(500).json({ error: 'Erro ao conectar ao Soundpad: ' + error.message });
  }
});

// Desconectar do Soundpad
app.post('/disconnect', (req, res) => {
  if (soundpadInstance && isConnected) {
    soundpadInstance.disconnect();
    isConnected = false;
    console.log('Desconectado do Soundpad');
  }
  
  res.json({ connected: false });
});

// Status de conexão
app.get('/status', (req, res) => {
  res.json({ connected: isConnected });
});

// Obter lista de sons
app.get('/sounds', checkConnection, async (req, res) => {
  try {
    const soundList = await soundpadInstance.getSoundListJSON();
    res.json({ sounds: soundList });
  } catch (error) {
    console.error('Erro ao obter lista de sons:', error.message);
    res.status(500).json({ error: 'Erro ao obter lista de sons: ' + error.message });
  }
});

// Obter categorias
app.get('/categories', checkConnection, async (req, res) => {
  try {
    const withSounds = req.query.withSounds === 'true';
    const withIcons = req.query.withIcons === 'true';
    
    const categories = await soundpadInstance.getCategoriesJSON(withSounds, withIcons);
    res.json({ categories });
  } catch (error) {
    console.error('Erro ao obter categorias:', error.message);
    res.status(500).json({ error: 'Erro ao obter categorias: ' + error.message });
  }
});

// Reproduzir som
app.post('/play', checkConnection, async (req, res) => {
  try {
    const { index, renderLine, captureLine } = req.body;
    
    if (renderLine !== undefined && captureLine !== undefined) {
      await soundpadInstance.playSound(index, renderLine, captureLine);
    } else {
      await soundpadInstance.playSound(index);
    }
    
    res.json({ playing: true, index });
  } catch (error) {
    console.error('Erro ao reproduzir som:', error.message);
    res.status(500).json({ error: 'Erro ao reproduzir som: ' + error.message });
  }
});

// Parar reprodução
app.post('/stop', checkConnection, async (req, res) => {
  try {
    await soundpadInstance.stopSound();
    res.json({ playing: false });
  } catch (error) {
    console.error('Erro ao parar som:', error.message);
    res.status(500).json({ error: 'Erro ao parar som: ' + error.message });
  }
});

// Obter status de reprodução
app.get('/play-status', checkConnection, async (req, res) => {
  try {
    const status = await soundpadInstance.getPlayStatus();
    res.json({ status });
  } catch (error) {
    console.error('Erro ao obter status de reprodução:', error.message);
    res.status(500).json({ error: 'Erro ao obter status de reprodução: ' + error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor REST rodando na porta ${PORT}`);
  // Exibir informações sobre a biblioteca para debug
  console.log('Versão da biblioteca soundpad.js:', soundpadjs.version || 'desconhecida');
  console.log('Tipo da biblioteca soundpad.js:', typeof soundpadjs);
  console.log('Propriedades disponíveis:', Object.keys(soundpadjs));
});
