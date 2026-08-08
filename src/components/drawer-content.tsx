import MaterialIcons, {
  type MaterialIconsIconName,
} from '@react-native-vector-icons/material-icons';
import type { Href } from 'expo-router';
import { router, usePathname } from 'expo-router';
import type { DrawerContentComponentProps } from 'expo-router/drawer';
import { Pressable, Text, View } from 'react-native';
import { DrawerHeader } from '@/components/drawer-header';

type DrawerItem = {
  label: string;
  href: Href;
  active: boolean;
  icon: MaterialIconsIconName;
};

export function DrawerContent({ navigation }: DrawerContentComponentProps) {
  const pathname = usePathname();

  const items: DrawerItem[] = [
    {
      label: 'Today',
      href: '/tasks',
      active: pathname === '/tasks',
      icon: 'calendar-today',
    },
    {
      label: 'Inbox',
      href: '/tasks/inbox',
      active: pathname === '/tasks/inbox',
      icon: 'inbox',
    },
  ];

  return (
    <View className="flex-1">
      <DrawerHeader />
      <View className="flex flex-col gap-y-1 p-3">
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => {
              router.push(item.href);
              setTimeout(() => navigation.closeDrawer(), 400);
            }}
            className={`flex h-14 flex-row items-center rounded px-4 gap-x-4 ${item.active ? 'bg-primary/10' : ''}`}
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color={item.active ? '#6366f1' : '#6b7280'}
            />
            <Text
              className={`flex-1 text-lg font-semibold ${item.active ? 'text-primary' : 'text-foreground'}`}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
