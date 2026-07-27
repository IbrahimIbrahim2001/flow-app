import { Button } from '@/components/ui/button'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PasswordScreen() {
    const router = useRouter()

    return (
        <View className="flex-1 bg-background  px-6">
            <SafeAreaView className="flex-1">
                <View className="gap-y-4">
                    <Text className="text-xl">Create password</Text>
                    <Button label='Next' onPress={() => router.push('/(auth)/name')} />
                </View>
            </SafeAreaView>
        </View>
    )
}
