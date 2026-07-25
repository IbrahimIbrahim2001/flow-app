import { Pressable, PressableProps, Text } from 'react-native';

type Variant = 'primary' | 'ghost' | 'danger' | 'outline';

interface ButtonProps extends PressableProps {
  variant?: Variant;
  label: string;
  icon?: React.ReactNode;
}

const base = 'w-full px-4 py-3 rounded-xl items-center justify-center flex-row gap-2';

const styles: Record<Variant, { box: string; text: string }> = {
  primary: { box: 'bg-primary', text: 'text-primary-foreground' },
  ghost: { box: 'bg-transparent', text: 'text-foreground' },
  danger: { box: 'bg-danger', text: 'text-white' },
  outline: { box: 'bg-background border border-border', text: 'text-foreground' },
};

export function Button({ variant = 'primary', label, icon,className, ...props }: ButtonProps) {
  const s = styles[variant];
  return (
    <Pressable className={`${base} ${s.box} ${className ?? ''}`} {...props}>
      {icon}
      <Text className={`font-semibold ${s.text}`}>{label}</Text>
    </Pressable>
  );
}
