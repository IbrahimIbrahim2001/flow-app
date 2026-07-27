import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { onboardingSchema } from '@/schema/onboarding-schema'
import { useOnboardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from "react-hook-form"
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as z from "zod"

const nameSchema = onboardingSchema.pick({ name: true })
type NameForm = z.infer<typeof nameSchema>

export default function NameScreen() {
    const setData = useOnboardingStore(s => s.setData)
    const { control, handleSubmit } = useForm<NameForm>({
        resolver: zodResolver(nameSchema),
    })

    const onSubmit = (data: NameForm) => {
        setData(data)
    }

    return (
        <View className="flex-1 bg-background px-6">
            <SafeAreaView className="flex-1">
                <View className="gap-y-4">
                    <Text className="text-xl">What's your name?</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Full name"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Button label='Register' onPress={handleSubmit(onSubmit)} />
                </View>
            </SafeAreaView>
        </View>
    )
}
