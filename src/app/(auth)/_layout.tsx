import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AuthLayout() {
  const theme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        animation: 'ios_from_right',
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#0b0f17' : '#ffffff',
        },
        contentStyle: {
          backgroundColor: theme === 'dark' ? '#0b0f17' : '#ffffff',
          flex: 1,
        },
      }}
    />
  );
}
