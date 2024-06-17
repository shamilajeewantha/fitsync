import { Stack } from 'expo-router/stack';
import React from 'react';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: 'Signup' }}
      />
      <Stack.Screen
        name="shopsignup"
        options={{ title: 'Shop Signup' }}
      />
    </Stack>
  );
}