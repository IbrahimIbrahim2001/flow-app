import PagerView, { type PagerViewRef } from '@expo/ui/community/pager-view';
import { useRef, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

const slides = new Array(5).fill(null).map((_, i) => ({
  title: `Slide ${i + 1}`,
  subtitle: "Description for this slide goes here",
}))

export default function OnboardingCarousel() {
  const { width, height } = useWindowDimensions()
  const [page, setPage] = useState(0)
  const pagerRef = useRef<PagerViewRef>(null)

  return (
    <View className="flex-1 ">
      <PagerView
        ref={pagerRef}
        style={{ width, height: height * 0.6 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {slides.map((item) => (
          <View key={item.title} className="flex-1 items-center px-8 pb-2">
            <View className="flex-1 items-center justify-center">
              <View className="size-40 rounded-full bg-primary items-center justify-center">
                <Text className="text-foreground text-lg">{item.title}</Text>
              </View>
            </View>
            <Text className="text-foreground text-center text-md font-semibold pb-4">
              {item.subtitle}
            </Text>
          </View>
        ))}
      </PagerView>
      <View className="flex-row justify-center pb-10 gap-2">
        {slides.map((_, i) => (
          <Pressable  key={i} onPress={() => pagerRef.current?.setPage(i)}>
          <View
            className={`h-1.5 rounded-full ${i === page ? "w-4.5 bg-primary" : "w-1.5 bg-muted/50"}`}
            />
            </Pressable>
        ))}
      </View>
    </View>
  )
}
