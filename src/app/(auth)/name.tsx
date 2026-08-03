import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type * as z from 'zod';
import { register } from '@/api/register';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { onboardingSchema } from '@/schema/onboarding-schema';
import { useAuthStore } from '@/store/auth-store';
import { useOnboardingStore } from '@/store/onboarding-store';

const nameSchema = onboardingSchema.pick({ name: true });
type NameForm = z.infer<typeof nameSchema>;

export default function NameScreen() {
  const router = useRouter();
  const setData = useOnboardingStore((s) => s.setData);
  const email = useOnboardingStore((s) => s.email);
  const password = useOnboardingStore((s) => s.password);
  const signIn = useAuthStore((s) => s.signIn);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
  });

  const onSubmit = async (data: NameForm) => {
    try {
      setData(data);
      const result = await register(data.name, email ?? '', password ?? '');
      if (result.success && result.data?.data) {
        signIn(result.data.data);
        router.replace('/(tabs)');
      } else {
        setError('name', { type: 'manual', message: result.message });
      }
    } catch {
      setError('name', { type: 'manual', message: 'Something went wrong' });
    }
  };

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
          {errors.name && (
            <Text className="text-red-500 text-sm">{errors.name.message}</Text>
          )}
          <Button
            label={isSubmitting ? '' : 'Register'}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
