import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OnboardingCarousel from '@/components/onboarding-carousel';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/ui/google-icon';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <OnboardingCarousel />
      <View
        className="items-center px-8 gap-y-4 h-40"
        style={{ paddingBottom: insets.bottom }}
      >
        <Button
          variant="primary"
          label="Sign in with Email"
          icon={<MaterialIcons name="email" size={20} color="#fff" />}
          onPress={() => router.push('/(auth)/email')}
        />
        <Button
          variant="outline"
          label="Continue with Google"
          disabled
          icon={<GoogleIcon />}
        />
      </View>
    </View>
  );
}
