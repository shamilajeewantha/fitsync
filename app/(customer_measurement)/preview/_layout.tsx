import React from "react";
import { Stack, useRouter } from "expo-router";

export default function StackLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="viewpre"
        options={{
          headerShown: false
        }}
    />
    <Stack.Screen
        name="summary"
        options={{
          title: "Order Summary"
        }}
    />
    </Stack>
  );
}