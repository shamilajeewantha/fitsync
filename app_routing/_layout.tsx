import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />  
      <Stack.Screen name="signin" options={{ title: 'Signin' }} />
      <Stack.Screen name="(tabs)" options={{ title: 'Nested Tabs', headerShown: true }} />
    </Stack>
  );
}
