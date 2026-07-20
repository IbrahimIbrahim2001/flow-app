import { Pressable, PressableProps, Text } from 'react-native';

type Variant = 'primary' | 'ghost' | 'danger';

interface ButtonProps extends PressableProps {
  variant?: Variant;
  label: string;
}

const base = 'px-4 py-3 rounded-xl items-center justify-center flex-row';

const styles: Record<Variant, { box: string; text: string }> = {
  primary: { box: 'bg-primary', text: 'text-primary-foreground' },
  ghost: { box: 'bg-transparent border border-border', text: 'text-foreground' },
  danger: { box: 'bg-danger', text: 'text-white' },
};

export function Button({ variant = 'primary', label, className, ...props }: ButtonProps) {
  const s = styles[variant];
  return (
    <Pressable className={`${base} ${s.box} ${className ?? ''}`} {...props}>
      <Text className={`font-semibold ${s.text}`}>{label}</Text>
    </Pressable>
  );
}
