import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useSoundpad } from "../context/SoundpadContext"; // Import context to get theme

const SoundButton = ({ sound, isPlaying, onPress }) => {
  const { theme, buttonSize } = useSoundpad(); // Get theme and buttonSize from context

  // Define styles based on theme and button size
  const themedStyles = getThemedStyles(theme);
  const sizeStyles = getSizeStyles(buttonSize);

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        themedStyles.button, 
        sizeStyles.button, 
        isPlaying && styles.playing // Apply playing style if needed
      ]}
      onPress={onPress}
    >
      <Text style={[themedStyles.title, sizeStyles.title]} numberOfLines={2} ellipsizeMode="tail">
        {sound.title}
      </Text>
      {/* Optionally show duration based on size */}
      {buttonSize !== 'small' && (
        <Text style={[themedStyles.duration, sizeStyles.duration]}>
          {sound.duration}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Function to get styles based on theme
const getThemedStyles = (theme) => StyleSheet.create({
  button: {
    backgroundColor: theme === 'dark' ? "#333" : "#eee",
    shadowColor: theme === 'dark' ? "#000" : "#999",
  },
  title: {
    color: theme === 'dark' ? "#fff" : "#000",
  },
  duration: {
    color: theme === 'dark' ? "#999" : "#555",
  },
});

// Function to get styles based on button size
const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return StyleSheet.create({
        button: { height: 80, padding: 10 },
        title: { fontSize: 13, marginBottom: 3 },
        duration: { fontSize: 10 },
      });
    case 'large':
      return StyleSheet.create({
        button: { height: 120, padding: 20 },
        title: { fontSize: 18, marginBottom: 7 },
        duration: { fontSize: 14 },
      });
    case 'medium':
    default:
      return StyleSheet.create({
        button: { height: 100, padding: 15 },
        title: { fontSize: 16, marginBottom: 5 },
        duration: { fontSize: 12 },
      });
  }
};

// Common styles
const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  playing: {
    borderColor: "#4CAF50", // Add a border or change background when playing
    borderWidth: 2,
    // backgroundColor: "#4a4a4a", // Example: slightly different background when playing
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  duration: {
    textAlign: "center",
  },
});

export default SoundButton;

