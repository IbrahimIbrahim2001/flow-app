import { Button } from '@/components/ui/button'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NameScreen() {
    return (
        <View className="flex-1 bg-background  px-6">
            <SafeAreaView className="flex-1">
                <View className="gap-y-4">
                    <Text className="text-xl">What's your name?</Text>
                    <Button label='Register' />
                </View>
            </SafeAreaView>
        </View>
    )
}
