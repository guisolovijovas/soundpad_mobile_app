import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SoundButton = ({ sound, isPlaying, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        isPlaying ? styles.playingButton : null
      ]}
      onPress={onPress}
    >
      <Text style={styles.title} numberOfLines={2}>
        {sound.title || sound.name || 'Som'}
      </Text>
      {sound.duration && (
        <Text style={styles.duration}>
          {sound.duration}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    margin: 5,
    padding: 15,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  playingButton: {
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  duration: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default SoundButton;
