import { View, ViewProps } from 'react-native';
import { Text } from 'react-native';

interface BadgeProps extends ViewProps {
  label: string;
  textClassName?: string;
}

export function Badge({ label, className, textClassName, ...props }: BadgeProps) {
  return (
    <View
      className={`px-2 py-0.5 rounded-full self-start ${className ?? ''}`}
      {...props}
    >
      <Text className={`text-xs font-medium text-white ${textClassName ?? ''}`}>{label}</Text>
    </View>
  );
}
