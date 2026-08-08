import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function CalendarLayout() {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        title: 'Calendar',
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
