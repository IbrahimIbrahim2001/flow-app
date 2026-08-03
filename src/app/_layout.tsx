import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Uniwind } from 'uniwind';
import { useAuthStore } from '@/store/auth-store';
import '../global.css';

SplashScreen.preventAutoHideAsync();

function SplashScreenController() {
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  return null;
}

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    Uniwind.setTheme('system'); // follows device light/dark
  }, []);

  return (
    <>
      <SplashScreenController />
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
