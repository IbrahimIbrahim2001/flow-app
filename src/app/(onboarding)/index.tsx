import OnboardingCarousel from '@/components/onboarding-carousel'
import { Button } from '@/components/ui/button'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <OnboardingCarousel />
      <View className="items-center px-8 gap-y-4 h-40" style={{ paddingBottom: insets.bottom }}>
        <Button variant='primary' label='Sign in with Email'/>
        <Button variant='outline' label='Continue with Google'/>
      </View>
    </View>
  )
}