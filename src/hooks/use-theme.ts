import { useColorScheme } from 'react-native';
import { type ThemeColors, themeColors } from '@/theme/colors';

export type Theme = {
  isDark: boolean;
  scheme: 'light' | 'dark';
  colors: ThemeColors;
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return {
    isDark,
    scheme: isDark ? 'dark' : 'light',
    colors: isDark ? themeColors.dark : themeColors.light,
  };
}
