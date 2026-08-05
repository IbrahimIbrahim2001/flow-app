import { useAuthStore } from '@/store/auth-store';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Uniwind } from 'uniwind';
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
  const theme = useColorScheme();
  const backgroundColor = theme === 'dark' ? '#0b0f17' : '#ffffff';

  useEffect(() => {
    Uniwind.setTheme('system'); // follows device light/dark
  }, []);

  return (
    <>
      <SplashScreenController />
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              contentStyle: { backgroundColor },
              headerStyle: { backgroundColor },
            }}
          ></Stack.Screen>
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
