import React, { useState, useRef } from 'react';
import { View, PanResponder, Text, StyleSheet, Dimensions, PanResponderInstance } from 'react-native';
import MeasurementImage from './MeasurementImage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface GestureState {
  moveY: number;
}

const HorizontalLine = (): JSX.Element => {
  const [position, setPosition] = useState<number>(screenHeight / 2);

  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (_evt, gestureState: GestureState) => {
        setPosition(gestureState.moveY);
      },
      onPanResponderMove: (_evt, gestureState: GestureState) => {
        setPosition(gestureState.moveY);
      },
    }),
  ).current;

  return (
    <View {...panResponder.panHandlers}>
        <MeasurementImage />
      <View style={[styles.line, { top: position }]} />
      <Text style={styles.text}>
        Finger Position: {position.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({

  line: {
    width: screenWidth,
    height: 1,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 20,
  },
  text: {
    color: 'white',
    marginTop: 20,
  },
});

export default HorizontalLine;
