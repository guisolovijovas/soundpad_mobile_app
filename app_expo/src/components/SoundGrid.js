import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SoundButton from './SoundButton';

const SoundGrid = ({ sounds, currentSound, isPlaying, onSoundPress }) => {
  if (!sounds || sounds.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhum som encontrado nesta lista.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <SoundButton 
      sound={item}
      isPlaying={currentSound === item.index && isPlaying}
      onPress={() => onSoundPress(item.index)}
    />
  );

  return (
    <FlatList
      data={sounds}
      renderItem={renderItem}
      keyExtractor={item => item.index.toString()}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default SoundGrid;
