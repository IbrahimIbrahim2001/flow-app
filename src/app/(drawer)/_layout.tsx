import { usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { DrawerContent } from '@/components/drawer-content';
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
        swipeEdgeWidth: 300,
        drawerType: 'front',
        overlayColor: colors.overlay,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerContentContainerStyle: {
          flex: 1,
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.foregroundSecondary,
        drawerLabelStyle: { color: colors.foreground },
        drawerItemStyle: {
          borderRadius: 12,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}
