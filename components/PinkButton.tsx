import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

interface PinkButtonProps {
  onPress: () => void; // Define the onPress handler as a prop
  buttonText: string; // Define the text for the button
  marginHorizontal?: string; // Optional prop for marginHorizontal
  backgroundColor?: boolean; // Optional prop for backgroundColor
}

const PinkButton: React.FC<PinkButtonProps> = ({ onPress, buttonText, marginHorizontal, backgroundColor = true }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
          { 
            marginHorizontal: marginHorizontal || '30%',
            backgroundColor: backgroundColor ? '#eb3483' : 'transparent', // Set background color or make transparent
          }
        ]}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#eb3483',
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PinkButton;
