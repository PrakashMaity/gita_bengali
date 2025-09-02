import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OnboardingState {
  isFirstLaunch: boolean;
  isOnboardingComplete: boolean;
  currentStep: number;
  totalSteps: number;
}

interface OnboardingActions {
  setFirstLaunch: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetOnboarding: () => void;
}

interface OnboardingStore extends OnboardingState, OnboardingActions {}

// Custom storage adapter for Zustand persistence
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error('Error setting item in secure storage:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error('Error removing item from secure storage:', error);
    }
  },
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isFirstLaunch: true,
      isOnboardingComplete: false,
      currentStep: 0,
      totalSteps: 3,

      // Actions
      setFirstLaunch: (value: boolean) => {
        set({ isFirstLaunch: value });
      },

      setOnboardingComplete: (value: boolean) => {
        set({ isOnboardingComplete: value });
      },

      setCurrentStep: (step: number) => {
        const { totalSteps } = get();
        if (step >= 0 && step < totalSteps) {
          set({ currentStep: step });
        }
      },

      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps - 1) {
          set({ currentStep: currentStep + 1 });
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },

      resetOnboarding: () => {
        set({
          isFirstLaunch: true,
          isOnboardingComplete: false,
          currentStep: 0,
        });
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        isFirstLaunch: state.isFirstLaunch,
        isOnboardingComplete: state.isOnboardingComplete,
        currentStep: state.currentStep,
      }),
    }
  )
);
