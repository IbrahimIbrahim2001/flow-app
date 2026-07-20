import { useEffect } from "react";
import { Stack } from "expo-router";
import { Uniwind } from "uniwind";
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    Uniwind.setTheme("system"); // follows device light/dark
  }, []);

  return <Stack />;
}