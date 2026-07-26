import { OnboardingSlide, onboardingSlides } from '@/constants/onboarding'
import PagerView, { type PagerViewRef } from '@expo/ui/community/pager-view'
import { useRef, useState } from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export default function OnboardingCarousel() {
  const { width, height } = useWindowDimensions()
  const [page, setPage] = useState(0)
  const pagerRef = useRef<PagerViewRef>(null)

  return (
    <View className="flex-1">
      <PagerView
        ref={pagerRef}
        style={{ width, height: height * 0.65 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {onboardingSlides.map((slide) => (
          <View key={slide.id} className="flex-1 items-center px-8 pb-2">
            <SlideSVG slide={slide} />
            <View className="flex-1" />
            <Text className="text-foreground text-lg font-bold">{slide.title}</Text>
            <Text className="text-foreground/80 text-center text-md pb-4">
              {slide.subtitle}
            </Text>
          </View>
        ))}
      </PagerView>
      <View className="flex-row justify-center pb-10 gap-2">
        {onboardingSlides.map((_, i) => (
          <Pressable key={i} onPress={() => pagerRef.current?.setPage(i)}>
            <View
              className={`h-1.5 rounded-full ${i === page ? 'w-4.5 bg-primary' : 'w-1.5 bg-muted/50'}`}
            />
          </Pressable>
        ))}
      </View>
    </View>
  )
}


function SlideSVG({slide}: {slide: OnboardingSlide}) {
  const SvgImage = slide.svgImage
  return (
    <View className="absolute inset-0 items-center justify-center px-8">
      <Svg width="100%" height="100%" viewBox="0 0 200 200">
        <Path
          fill={slide.blobColor}
          d={slide.blobPath}
          transform={`translate(100 100) rotate(${slide.blobRotation}) scale(1.2)`}
          opacity={0.7}
        />
      <SvgImage width={180} height={180} />
      </Svg>
    </View>
  )
}