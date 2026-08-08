import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function TagScreen() {
  const { tag } = useLocalSearchParams<{ tag: string }>();
  const title = `#${tag}`;

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ title }} />
      <Text>{tag}</Text>
    </View>
  );
}
