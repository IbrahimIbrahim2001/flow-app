import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function SettingsScreen() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View className="flex-1 bg-background">
        <Text>settings</Text>
      </View>
    </SafeAreaView>
  );
}
