import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { onboardingSchema } from '@/schema/onboarding-schema';
import { useOnboardingStore } from '@/store/onboarding-store';

const emailSchema = onboardingSchema.pick({ email: true });
type EmailForm = z.infer<typeof emailSchema>;

export default function EmailScreen() {
  const router = useRouter();
  const setData = useOnboardingStore((s) => s.setData);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: EmailForm) => {
    setData(data);
    router.push('/(auth)/password');
  };

  return (
    <View className="flex-1 bg-background px-6">
      <SafeAreaView className="flex-1">
        <View className="gap-y-4">
          <Text className="text-xl">Sign in / Sign up</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
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
