import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';
export function DrawerHeader() {
  const user = useAuthStore((s) => s.user);
  const name = user?.name || 'Unknown User';
  const image = user?.image || null;
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        justifyContent: 'flex-start',
      }}
    >
      <View className="flex flex-row items-center gap-x-2 p-6">
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 40, height: 40, borderRadius: 16 }}
          />
        ) : (
          <Text className="rounded-full size-10 bg-primary text-primary-foreground text-center py-2 font-bold">
            {name.charAt(0).toUpperCase()}
          </Text>
        )}
        <Text
          numberOfLines={1}
          className="flex-1 text-lg text-primary-foreground font-semibold truncate capitalize"
        >
          {name}
        </Text>
        <View className="flex-row gap-x-2 ml-auto">
          {/* TODO: update the links */}
          <Link href="/settings">
            <MaterialIcons name="search" size={22} color={colors.foreground} />
          </Link>
          {/* TODO: update the links */}
          <Link href="/settings">
            <MaterialIcons
              name="notifications-none"
              size={22}
              color={colors.foreground}
            />
          </Link>
          <Link href="/settings">
            <Image
              source={require('@/assets/icons/settings-outline.png')}
              style={{ width: 22, height: 22 }}
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
