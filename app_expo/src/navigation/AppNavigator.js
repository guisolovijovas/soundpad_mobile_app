import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas
import HomeScreen from '../screens/HomeScreen';
import ImportListScreen from '../screens/ImportListScreen';
import SoundListScreen from '../screens/SoundListScreen';
import SoundGridScreen from '../screens/SoundGridScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#121212' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImportList" component={ImportListScreen} />
        <Stack.Screen name="SoundList" component={SoundListScreen} />
        <Stack.Screen name="SoundGrid" component={SoundGridScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
