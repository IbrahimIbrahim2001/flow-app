import { View, ViewProps } from 'react-native';

export function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={`bg-card border border-border rounded-2xl p-4 ${className ?? ''}`}
      {...props}
    />
  );
}
