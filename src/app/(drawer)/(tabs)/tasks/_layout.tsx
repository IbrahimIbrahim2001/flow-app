import { useTheme } from '@/hooks/use-theme';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Stack, useNavigation } from 'expo-router';
import { DrawerNavigationProp } from 'expo-router/drawer';
import { Pressable } from 'react-native';

export default function TasksLayout() {
  const { colors } = useTheme();
  const drawerNavigation = useNavigation<DrawerNavigationProp<Record<string, object | undefined>>>(
    '/(drawer)'
  );

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Today',
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: {
          fontWeight: 'semibold',
          fontSize: 20,
        },
        headerLeft: () => (
          <Pressable onPress={() => drawerNavigation.openDrawer()} hitSlop={8} className='mr-6'>
            <MaterialIcons name="menu" size={24} color={colors.foreground} />
          </Pressable>
        ),
      }}
    />
  );
}