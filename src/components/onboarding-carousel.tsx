import PagerView, { type PagerViewRef } from '@expo/ui/community/pager-view';
import { useRef } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { type OnboardingSlide, onboardingSlides } from '@/constants/onboarding';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function OnboardingCarousel() {
  const { width, height } = useWindowDimensions();
  const pagerRef = useRef<PagerViewRef>(null);
  const scrollPos = useSharedValue(0);
  const blobScroll = useSharedValue(0);

  return (
    <View className="flex-1">
      <PagerView
        ref={pagerRef}
        style={{ width, height: height * 0.65 }}
        initialPage={0}
        onPageScroll={(e) => {
          const v = e.nativeEvent.position + e.nativeEvent.offset;
          scrollPos.value = v;
          blobScroll.value = withTiming(v, { duration: 400 });
        }}
      >
        {onboardingSlides.map((slide, i) => (
          <SlidePage
            key={slide.id}
            slide={slide}
            index={i}
            scrollPos={scrollPos}
            blobScroll={blobScroll}
          />
        ))}
      </PagerView>
      <View className="flex-row justify-center pb-10 gap-2">
        {onboardingSlides.map((slide, i) => (
          <Pressable
            key={slide.id}
            onPress={() => pagerRef.current?.setPage(i)}
          >
            <Dot index={i} scrollPos={scrollPos} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SlidePage({
  slide,
  index,
  scrollPos,
  blobScroll,
}: {
  slide: OnboardingSlide;
  index: number;
  scrollPos: SharedValue<number>;
  blobScroll: SharedValue<number>;
}) {
  const rStyle = useAnimatedStyle(() => {
    const distance = Math.abs(index - scrollPos.value);
    const scale = 1 - Math.min(distance, 1) * 0.6;
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      style={rStyle}
      className="flex-1 items-center px-8 pb-2"
    >
      <SlideSVG slide={slide} index={index} blobScroll={blobScroll} />
      <View className="flex-1" />
      <Text className="text-foreground text-lg font-bold">{slide.title}</Text>
      <Text className="text-foreground/80 text-center text-md pb-4">
        {slide.subtitle}
      </Text>
    </Animated.View>
  );
}

function Dot({
  index,
  scrollPos,
}: {
  index: number;
  scrollPos: SharedValue<number>;
}) {
  const rStyle = useAnimatedStyle(() => {
    const distance = Math.abs(index - scrollPos.value);
    const w = interpolate(distance, [0, 0.5], [18, 6], Extrapolation.CLAMP);
    const bg = interpolateColor(distance, [0, 0.5], ['#208aef', '#94a3b8']);
    return { width: w, backgroundColor: bg };
  });

  return <Animated.View style={rStyle} className="h-1.5 rounded-full" />;
}

function SlideSVG({
  slide,
  index,
  blobScroll,
}: {
  slide: OnboardingSlide;
  index: number;
  blobScroll: SharedValue<number>;
}) {
  const SvgImage = slide.svgImage;

  const rProps = useAnimatedProps(() => {
    const offset = (blobScroll.value - index) * 72;
    return {
      transform: [
        { translateX: 100 },
        { translateY: 100 },
        { rotate: `${slide.blobRotation + offset}deg` },
        { scale: 1.2 },
      ] as never,
    };
  });

  return (
    <View className="absolute inset-0 items-center justify-center px-8">
      <Svg width="100%" height="100%" viewBox="0 0 200 200">
        <AnimatedPath
          fill={slide.blobColor}
          d={slide.blobPath}
          animatedProps={rProps}
          opacity={0.7}
        />
        <SvgImage width={180} height={180} />
      </Svg>
    </View>
  );
}
