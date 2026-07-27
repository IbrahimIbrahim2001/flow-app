import { Stack } from "expo-router";
import { useEffect } from "react";
import { Uniwind } from "uniwind";
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    Uniwind.setTheme("system"); // follows device light/dark
  }, []);

  return (
      <Stack>
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
  );
}