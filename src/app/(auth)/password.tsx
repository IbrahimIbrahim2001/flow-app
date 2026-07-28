import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { onboardingSchema } from '@/schema/onboarding-schema'
import { useOnboardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm, useWatch } from "react-hook-form"
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import validator from 'validator'
import * as z from "zod"

const passwordSchema = onboardingSchema.pick({ password: true })
type PasswordForm = z.infer<typeof passwordSchema>

type Requirement = {
    label: string
    met: boolean
}

const metColor = "#22c55e"
const unmetColor = "#94a3b8"

export default function PasswordScreen() {
    const router = useRouter()
    const setData = useOnboardingStore(s => s.setData)
    const isNewUser = useOnboardingStore(s => s.isNewUser)
    const [showPassword, setShowPassword] = useState(false)
    const { control, handleSubmit, setError, formState: { errors, isValid, isSubmitting } } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
    })

    const onSubmit = async (data: PasswordForm) => {
        try {
            setData(data)
            router.push('/(auth)/name')
        } catch {
            setError('password', { type: 'manual', message: 'Something went wrong' })
        }
    }

    const watchPassword = useWatch({
        control,
        name: "password",
    })

    return (
        <View className="flex-1 bg-background px-6">
            <SafeAreaView className="flex-1">
                <View className="gap-y-4">
                    <Text className="text-xl">{isNewUser ? "Create password" : "Enter your password"}</Text>
                    <View className="relative">
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder="Password"
                                    secureTextEntry={!showPassword}
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {watchPassword?.length > 0 &&
                            <Pressable
                                onPress={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-3"
                            >
                                <MaterialIcons
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    size={24}
                                    color="#6366f1"
                                />
                            </Pressable>
                        }
                    </View>
                    {errors.password && (
                        <Text className="text-red-500 text-sm">{errors.password.message}</Text>
                    )}
                    <Button
                        label={isSubmitting ? '' : 'Next'}
                        disabled={!isValid}
                        icon={isSubmitting ? <ActivityIndicator color="#fff" /> : undefined}
                        onPress={handleSubmit(onSubmit)}
                    />
                    {isNewUser && <RequirementsList password={watchPassword ?? ""} />}
                </View>
            </SafeAreaView>
        </View>
    )
}

function RequirementsList({ password }: { password: string }) {
    const requirements: Requirement[] = [
        { label: "At least 8 characters", met: validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 }) },
        { label: "Contains numbers", met: validator.isStrongPassword(password, { minLength: 1, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0 }) },
        { label: "Contains special characters", met: validator.isStrongPassword(password, { minLength: 1, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 1 }) },
        { label: "Contains uppercase & lowercase", met: validator.isStrongPassword(password, { minLength: 1, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0 }) },
    ]
    return (
        <>
            {requirements.map((ele, index) => (
                <RequirementItem key={index} label={ele.label} met={ele.met} />
            ))}
        </>
    )
}

function RequirementItem({ label, met }: { label: string, met: boolean }) {
    return (
        <Text className={`flex items-center gap-x-2 ${met ? "text-green-600" : "text-muted-foreground"}`}>
            <MaterialIcons name={met ? "check-circle" : "radio-button-unchecked"} size={18} color={met ? metColor : unmetColor} /> {label}
        </Text>
    )
}