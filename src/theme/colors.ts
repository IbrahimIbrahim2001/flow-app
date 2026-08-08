export type ThemeColors = {
  background: string;
  backgroundSecondary: string;
  card: string;
  overlay: string;
  foreground: string;
  foregroundSecondary: string;
  muted: string;
  border: string;
  borderSubtle: string;
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
  priorityUrgent: string;
  completed: string;
  accent: string;
};

export const themeColors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#ffffff',
    backgroundSecondary: '#f4f6f8',
    card: '#ffffff',
    overlay: '#ffffff',
    foreground: '#0f172a',
    foregroundSecondary: '#475569',
    muted: '#94a3b8',
    border: '#e2e8f0',
    borderSubtle: '#f1f5f9',
    primary: '#208aef',
    primaryHover: '#1a7fd6',
    primaryForeground: '#ffffff',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
    priorityLow: '#22c55e',
    priorityMedium: '#eab308',
    priorityHigh: '#f97316',
    priorityUrgent: '#ef4444',
    completed: '#64748b',
    accent: '#208aef',
  },
  dark: {
    background: '#0b0f17',
    backgroundSecondary: '#131a26',
    card: '#1a2230',
    overlay: '#0b0f17',
    foreground: '#f8fafc',
    foregroundSecondary: '#94a3b8',
    muted: '#64748b',
    border: '#2a3342',
    borderSubtle: '#1f2733',
    primary: '#3b9eff',
    primaryHover: '#5aacff',
    primaryForeground: '#06121f',
    danger: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
    info: '#60a5fa',
    priorityLow: '#4ade80',
    priorityMedium: '#facc15',
    priorityHigh: '#fb923c',
    priorityUrgent: '#f87171',
    completed: '#64748b',
    accent: '#3b9eff',
  },
};
