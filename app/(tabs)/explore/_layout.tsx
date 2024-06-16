import React from "react";
import { Stack, useRouter } from "expo-router";

export default function StackLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          title: "Home Screen",
          headerShown: false
        }}
    />
    <Stack.Screen
        name="shopview"
        options={{
          title: "Shop Info"
        }}
    />
    </Stack>
  );
}