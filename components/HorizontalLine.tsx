import React, { useState } from 'react';
import { View, PanResponder, Text, StyleSheet, Dimensions } from 'react-native';
import MeasurementImage from './MeasurementImage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VerticalLine: React.FC = () => {
  const [position, setPosition] = useState(screenHeight / 2);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (_, gestureState) => {
        setPosition(gestureState.moveY);
      },
      onPanResponderMove: (_, gestureState) => {
        setPosition(gestureState.moveY);
      },
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <MeasurementImage />
      <View style={[styles.line, { top: position }]} />
      <Text style={styles.text}>
        Finger Position: {position.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  text: {
    color: 'white',
    marginTop: 20,
  },
});

export default VerticalLine;
