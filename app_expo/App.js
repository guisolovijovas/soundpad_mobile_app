import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { SoundpadProvider } from './src/context/SoundpadContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SoundpadProvider>
          <AppNavigator />
        </SoundpadProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
