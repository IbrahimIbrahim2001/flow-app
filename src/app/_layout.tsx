import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Uniwind } from 'uniwind';
import { useTheme } from '@/hooks/use-theme';
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
  const { colors } = useTheme();
  const backgroundColor = colors.background;

  useEffect(() => {
    Uniwind.setTheme('system'); // follows device light/dark
  }, []);

  return (
    <>
      <SplashScreenController />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen
              name="(drawer)"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor },
                headerStyle: { backgroundColor },
              }}
            ></Stack.Screen>
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </GestureHandlerRootView>
    </>
  );
}
