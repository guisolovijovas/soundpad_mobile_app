import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useSoundpad } from '../context/SoundpadContext';

const SoundListScreen = ({ navigation }) => {
  const { isConnected, soundLists, getSoundLists } = useSoundpad();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      loadSoundLists();
    } else {
      // Se não estiver conectado, redirecionar para a tela de importação
      navigation.replace('ImportList');
    }
  }, [isConnected]);

  const loadSoundLists = async () => {
    setIsLoading(true);
    try {
      await getSoundLists();
    } catch (error) {
      Alert.alert('Erro', `Falha ao carregar listas: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => navigation.navigate('SoundGrid', { listId: item.index, listName: item.name })}
    >
      <View style={styles.listItemContent}>
        <Text style={styles.listName}>{item.name}</Text>
        <Text style={styles.listCount}>{item.sounds ? item.sounds.length : 0} sons</Text>
      </View>
      <View style={styles.listItemArrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listas de Sons</Text>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Carregando listas de sons...</Text>
        </View>
      ) : soundLists && soundLists.length > 0 ? (
        <FlatList
          data={soundLists}
          renderItem={renderItem}
          keyExtractor={item => item.index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhuma lista importada.
          </Text>
          <TouchableOpacity 
            style={styles.importButton}
            onPress={() => navigation.navigate('ImportList')}
          >
            <Text style={styles.buttonText}>Importar Lista</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={loadSoundLists}
        >
          <Text style={styles.buttonText}>Atualizar</Text>
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
  listContainer: {
    padding: 15,
  },
  listItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemContent: {
    flex: 1,
  },
  listName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  listCount: {
    fontSize: 14,
    color: '#999',
  },
  listItemArrow: {
    paddingHorizontal: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#999',
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
    marginBottom: 20,
  },
  importButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
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
  refreshButton: {
    backgroundColor: '#2196F3',
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

export default SoundListScreen;
