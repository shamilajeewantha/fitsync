import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

interface PinkButtonProps {
  onPress: () => void; // Define the onPress handler as a prop
  buttonText: string; // Define the text for the button
}

const PinkButton: React.FC<PinkButtonProps> = ({ onPress, buttonText }) => {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eb3483',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: '30%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PinkButton;
