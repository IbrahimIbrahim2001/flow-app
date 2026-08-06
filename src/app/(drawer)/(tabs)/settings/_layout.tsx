import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsLayout() {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Settings',
        contentStyle: { backgroundColor },
        headerStyle: { backgroundColor },
        headerTitleStyle: {
          fontWeight: 'semibold',
          fontSize: 20,
        },
      }}
    />
  );
}
