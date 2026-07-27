import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { onboardingSchema } from '@/schema/onboarding-schema'
import { useOnboardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { Controller, useForm } from "react-hook-form"
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as z from "zod"

const passwordSchema = onboardingSchema.pick({ password: true })
type PasswordForm = z.infer<typeof passwordSchema>

export default function PasswordScreen() {
    const router = useRouter()
    const setData = useOnboardingStore(s => s.setData)
    const { control, handleSubmit } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
    })

    const onSubmit = (data: PasswordForm) => {
        setData(data)
        router.push('/(auth)/name')
    }

    return (
        <View className="flex-1 bg-background px-6">
            <SafeAreaView className="flex-1">
                <View className="gap-y-4">
                    <Text className="text-xl">Create password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Password"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Button label='Next' onPress={handleSubmit(onSubmit)} />
                </View>
            </SafeAreaView>
        </View>
    )
}
