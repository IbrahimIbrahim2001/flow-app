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
import { useAuthStore } from '@/store/auth-store';
import { useOnboardingStore } from '@/store/onboarding-store';

const USER_NOT_FOUND = 'user_not_found';
const WRONG_PASSWORD = 'wrong_password';
const INVALID_PASSWORD = 'invalid_password';

const passwordSchema = onboardingSchema.pick({ password: true });
type PasswordForm = z.infer<typeof passwordSchema>;

export default function PasswordScreen() {
  const router = useRouter();
  const setData = useOnboardingStore((s) => s.setData);
  const email = useOnboardingStore((s) => s.email);
  const signIn = useAuthStore((s) => s.signIn);
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
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
      setServerMessage('');
      const result = await login(email ?? '', data.password);
      if (result.success && result.data?.data) {
        signIn(result.data.data);
        router.replace('/(drawer)/(tabs)/tasks');
      } else if (result.error === USER_NOT_FOUND) {
        setData(data);
        router.push('/(auth)/name');
      } else if (result.error === WRONG_PASSWORD) {
        setError('password', { type: 'manual', message: result.message });
      } else if (result.error === INVALID_PASSWORD) {
        setServerMessage(
          'Password must be at least 8 characters with one uppercase letter, one lowercase letter, one number, and one symbol',
        );
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
                  autoCapitalize="none"
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
            <View className="flex-row items-center gap-x-2">
              <MaterialIcons name="error-outline" size={16} color="#dc2626" />
              <Text className="text-red-500 text-sm flex-1">
                {errors.password.message}
              </Text>
            </View>
          )}
          <Button
            label={isSubmitting ? '' : 'Next'}
            disabled={!isValid}
            icon={isSubmitting ? <ActivityIndicator color="#fff" /> : undefined}
            onPress={handleSubmit(onSubmit)}
          />
          {serverMessage ? (
            <View className="flex-row items-center gap-x-2 rounded-lg bg-blue-50 p-3">
              <MaterialIcons name="info-outline" size={18} color="#6366f1" />
              <Text className="text-gray-700 text-sm flex-1 leading-5">
                {serverMessage}
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
