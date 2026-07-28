import { OnboardingSchemaType } from "@/schema/onboarding-schema";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const secureStorage = {
  getItem: (name: string) => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

type OnboardingState = Partial<OnboardingSchemaType> & {
  isNewUser: boolean;
  setData: (data: Partial<OnboardingSchemaType>) => void;
  setIsNewUser: (isNew: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set)=>({
      isNewUser: true,
      setData: (data) => set(data),
      setIsNewUser: (isNew) => set({ isNewUser: isNew }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
)