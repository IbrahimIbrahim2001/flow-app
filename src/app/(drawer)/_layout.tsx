import { usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@/hooks/use-theme';

export default function DrawerLayout() {
  const { colors } = useTheme();
  const pathname = usePathname();
  const isTasks = pathname.startsWith('/tasks');

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        swipeEnabled: isTasks,
        swipeEdgeWidth: 120,
        drawerStyle: { backgroundColor: colors.background },
        drawerContentContainerStyle: {
          flex: 1,
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.foregroundSecondary,
        drawerLabelStyle: { color: colors.foreground },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: 'Flow' }} />
    </Drawer>
  );
}
