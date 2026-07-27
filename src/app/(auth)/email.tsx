import { Button } from '@/components/ui/button'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function EmailScreen() {
    const router = useRouter()

    return (
        <View className="flex-1 bg-background px-6">
            <SafeAreaView className="flex-1">
                <View className="gap-y-4">
                    <Text className="text-xl">Sign in / Sign up</Text>
                    <Button label='Next' onPress={() => router.push('/(auth)/password')} />
                </View>
            </SafeAreaView>
        </View>
    )
}
