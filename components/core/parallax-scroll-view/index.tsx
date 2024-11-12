/**
 *
 * This is a simple parallax scroll view component - inspired by Expo.
 * @see https://docs.expo.dev/
 */

import type { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import { LinearGradient } from 'expo-linear-gradient';

const HEADER_HEIGHT = 150;

type Props = PropsWithChildren<{
  className?: string;
  headerImage: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export const ParallaxScrollView = ({ children, headerImage, headerBackgroundColor, className }: Props) => {
  const { colorScheme } = useColorScheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <View className={cn("flex-1", className)}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          className={cn(className, {
            [`h-[150px] overflow-hidden mx-auto mt-10`]: true,

          })}
          style={headerAnimatedStyle}
        >
          {/* Add gradient background
          <LinearGradient
            colors={colorScheme === 'dark' ? ['#436697', '#436697'] : ['#436697', '#436697']}
            className="absolute w-full h-full"
          /> */}
          {headerImage}
        </Animated.View>
        {children}
      </Animated.ScrollView>
    </View>
  );
};
