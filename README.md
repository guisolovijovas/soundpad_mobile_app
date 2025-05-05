# Soundpad Mobile App

## Descrição

Soundpad Mobile App é um aplicativo móvel construído com React Native e Expo que permite tocar, gerenciar e compartilhar trechos de áudio de forma simples e rápida. O app se comunica com um servidor REST em Node.js/Express que fornece endpoints para listar, enviar e reproduzir os sons.

## Tecnologias

- **Frontend Mobile**  
  - React Native (v0.79.2)  
  - Expo (SDK 53)  
  - React Navigation (stack)  
  - AsyncStorage (armazenamento local)  
  - Expo AV (playback de áudio)  

- **Backend**  
  - Node.js (v16+)  
  - Express (v4.18.2)  
  - CORS  
  - [soundpad.js](https://www.npmjs.com/package/soundpad.js) (biblioteca de áudio)  

## Estrutura do Projeto

soundpad_mobile_app/
│
├── app_expo/ # Código do cliente Expo/React Native
│ ├── App.js # Entrada principal do app
│ ├── app.json # Configurações do Expo
│ ├── package.json # Dependências do frontend
│ └── src/
│ ├── navigation/ # Configuração de rotas (React Navigation)
│ ├── context/ # Context API para estado global (SoundpadContext)
│ ├── screens/ # Telas do aplicativo (Home, Player, Upload, etc.)
│ ├── components/ # Componentes reutilizáveis
│ └── services/ # Chamadas HTTP ao servidor
│
└── server/ # Servidor REST em Node.js/Express
├── server.js # Entrada do servidor
├── package.json # Dependências do backend
└── sound-files/ # Pasta onde os áudios são armazenados


## Pré-requisitos

- Node.js ≥ 16.x  
- npm ou Yarn  
- Expo CLI (`npm install -g expo-cli`)  

## Instalação

1. **Clonar o repositório**  
   ```bash
   git clone https://github.com/guisolovijovas/soundpad_mobile_app.git
   cd soundpad_mobile_app

2. **Instalar dependências do servidor**
   ```bash
   cd server
   npm install
     
3. **Instalar dependências do app Expo**
   ```bash
   cd ../app_expo
   npm install
