import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{

}>;

export default function ParallaxScrollView({
  children,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ paddingTop: 20 }}>
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
      </SafeAreaView>
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
