import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { OnboardingSchemaType } from '@/schema/onboarding-schema';

const secureStorage = {
  getItem: (name: string) => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string) =>
    SecureStore.setItemAsync(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

type OnboardingState = Partial<OnboardingSchemaType> & {
  setData: (data: Partial<OnboardingSchemaType>) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
