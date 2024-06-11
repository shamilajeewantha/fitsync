import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, LayoutChangeEvent, NativeSyntheticEvent, PanResponder, Dimensions, Text, Button } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MyComponent: React.FC = () => {
  const [linePosition, setLinePosition] = useState(screenHeight / 2);
  const imageLayoutRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const [lineWidth, setLineWidth] = useState(0);


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (_, gestureState) => {
        if (imageLayoutRef.current) {
          if (gestureState.moveY >= imageLayoutRef.current.y && gestureState.moveY <= imageLayoutRef.current.y + imageLayoutRef.current.height) {
            const heightPercentage = ((gestureState.moveY-imageLayoutRef.current.y) / imageLayoutRef.current.height) * 100;
            console.log(`Moved at ${heightPercentage.toFixed(2)}% of the image height.`);
            setLinePosition(gestureState.moveY);
          }
        }
      },
      onPanResponderMove: (_, gestureState) => {
        console.log("moveY: ", gestureState.moveY);

        if (imageLayoutRef.current) {
          if (gestureState.moveY >= imageLayoutRef.current.y && gestureState.moveY <= imageLayoutRef.current.y + imageLayoutRef.current.height) {
            const heightPercentage = ((gestureState.moveY-imageLayoutRef.current.y) / imageLayoutRef.current.height) * 100;
            console.log(`Moved at ${heightPercentage.toFixed(2)}% of the image height.`);            
            setLinePosition(gestureState.moveY);
            console.log("inside");
          }
          else{
            console.log("outside");
          }
        }

      },
    })
  ).current;

  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    imageLayoutRef.current = { x, y, width, height };
    setLineWidth(width); // Set the line width to match the image width
    console.log(`Image Layout:\nX: ${x}\nY: ${y}\nWidth: ${width}\nHeight: ${height}`);
  };

  const onTouchStart = (event: NativeSyntheticEvent<any>) => {
    console.log("Image touched");

    if (imageLayoutRef.current) {
      const touchY = event.nativeEvent.locationY;
      const heightPercentage = (touchY / imageLayoutRef.current.height) * 100;
      const pageY = event.nativeEvent.pageY;
      const absoluteY = imageLayoutRef.current.y + touchY;
      console.log(`Touched at ${heightPercentage.toFixed(2)}% of the image height.`);
      console.log(`Touched at pageY: ${pageY}`);
      console.log(`Touched at absoluteY: ${absoluteY}`);
      setLinePosition(absoluteY);
    }
  };

  useEffect(() => {
    console.log("Line position updated:", linePosition);
    if (imageLayoutRef.current) {
    const heightPercentage = ((linePosition-imageLayoutRef.current.y) / imageLayoutRef.current.height) * 100;
    console.log(`Line position updated at ${heightPercentage.toFixed(2)}% of the image height.`);
    }
  }, [linePosition]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        {...panResponder.panHandlers}
        source={require('@/assets/images/woman.png')}
        onLayout={handleImageLayout}
        onTouchStart={onTouchStart}
      />
      <View style={[styles.line, { top: linePosition - 0.5, width: lineWidth }]} />
      <Text style={styles.text}>Line position: {linePosition}</Text>
      <Button title="Set" onPress={() => setLinePosition(screenHeight / 2)} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300, // Define a fixed width for the image
    height: 600, // Define a fixed height for the image
  },
  line: {
    position: 'absolute',
    height: 2, // Adjusted the height to make the line more visible
    backgroundColor: 'red', // Change this value to adjust the color of the line

  },
  text: {
    color: 'white',
    marginTop: 20,
  },
});

export default MyComponent;
