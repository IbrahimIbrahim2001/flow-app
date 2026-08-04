import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#0b0f17' : '#ffffff';
  const primary = isDark ? '#3b9eff' : '#208aef';

  return (
    <NativeTabs
      backgroundColor={backgroundColor}
      labelVisibilityMode="unlabeled"
      iconColor={{ default: '#94a3b8', selected: primary }}
      disableIndicator
      labelStyle={{ fontSize: 12, fontWeight: '600' }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="checklist.checked" md="check_box" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calender">
        <NativeTabs.Trigger.Label>Calender</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="checklist.checked" md="calendar_month" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/icons/settings-2.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
