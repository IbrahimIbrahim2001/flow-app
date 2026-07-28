import { zodResolver } from '@hookform/resolvers/zod';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type * as z from 'zod';
import { login } from '@/api/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { onboardingSchema } from '@/schema/onboarding-schema';
import { useOnboardingStore } from '@/store/onboarding-store';

const passwordSchema = onboardingSchema.pick({ password: true });
type PasswordForm = z.infer<typeof passwordSchema>;

export default function PasswordScreen() {
  const router = useRouter();
  const setData = useOnboardingStore((s) => s.setData);
  const email = useOnboardingStore((s) => s.email);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordForm) => {
    try {
      const result = await login(email ?? '', data.password);
      if (result.success) {
        // setData(data)
        console.log(result.data);
        // router.push('/(tabs)/')
      } else {
        setData(data);
        router.push('/(auth)/name');
      }
    } catch {
      setError('password', { type: 'manual', message: 'Something went wrong' });
    }
  };

  const watchPassword = useWatch({
    control,
    name: 'password',
  });

  return (
    <View className="flex-1 bg-background px-6">
      <SafeAreaView className="flex-1">
        <View className="gap-y-4">
          <Text className="text-xl">Enter your password</Text>
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
            {watchPassword?.length > 0 && (
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3"
              >
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#6366f1"
                />
              </Pressable>
            )}
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm">
              {errors.password.message}
            </Text>
          )}
          <Button
            label={isSubmitting ? '' : 'Next'}
            disabled={!isValid}
            icon={isSubmitting ? <ActivityIndicator color="#fff" /> : undefined}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
