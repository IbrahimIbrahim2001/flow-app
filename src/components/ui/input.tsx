import { TextInput, TextInputProps } from 'react-native';

export function Input({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      className={`bg-background-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted ${className ?? ''}`}
      {...props}
    />
  );
}
