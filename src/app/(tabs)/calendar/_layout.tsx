import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function CalendarLayout() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#0b0f17' : '#ffffff';
  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
