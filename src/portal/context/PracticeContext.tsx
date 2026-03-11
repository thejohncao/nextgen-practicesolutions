import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useLocalStorage, type NGPStore, type StoredPractice } from '../hooks/useLocalStorage';
import { demoPractice, demoUser } from '../data/mock';
import type { Practice, PortalUser, PillarSlug } from '../types';

export interface CreatePracticeInput {
  name: string;
  ownerName: string;
  ownerEmail: string;
  locations: string[];
  plan: string;
}

interface PracticeContextValue {
  activePractice: Practice;
  activeUser: PortalUser;
  isDemo: boolean;
  allPractices: { id: string; name: string }[];
  switchPractice: (id: string) => void;
  createPractice: (data: CreatePracticeInput) => string;
  deletePractice: (id: string) => void;
  onboardingState: StoredPractice['onboarding'] | null;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  toggleItem: (pillar: PillarSlug, itemId: string) => void;
  getItemEnabled: (pillar: PillarSlug, itemId: string) => boolean;
  toggleAlmaItem: (category: 'programs' | 'rolePaths' | 'sops', id: string) => void;
  getAlmaItemEnabled: (category: 'programs' | 'rolePaths' | 'sops', id: string) => boolean;
}

const PracticeContext = createContext<PracticeContextValue | null>(null);

function makeId(): string {
  return 'prac_' + Math.random().toString(36).slice(2, 10);
}

function emptyOnboarding(): StoredPractice['onboarding'] {
  return {
    currentStep: 0,
    completedAt: null,
    giselle: {},
    miles: {},
    devon: {},
    alma: { programs: {}, rolePaths: {}, sops: {} },
  };
}

function getActivePractice(store: NGPStore): StoredPractice | null {
  if (store.activePracticeId === 'demo') return null;
  return store.practices.find((p) => p.id === store.activePracticeId) ?? null;
}

function updateActivePractice(store: NGPStore, fn: (p: StoredPractice) => StoredPractice): NGPStore {
  return {
    ...store,
    practices: store.practices.map((p) => (p.id === store.activePracticeId ? fn(p) : p)),
  };
}

export function PracticeProvider({ children }: { children: ReactNode }) {
  const { store, update } = useLocalStorage();

  const active = getActivePractice(store);
  const isDemo = !active;

  const activePractice: Practice = active
    ? {
        id: active.id,
        name: active.name,
        locations: active.locations,
        ownerName: active.ownerName,
        ownerEmail: active.ownerEmail,
        plan: active.plan,
        onboardedAt: active.createdAt,
      }
    : demoPractice;

  const activeUser: PortalUser = active
    ? {
        id: 'usr_' + active.id.slice(5),
        name: active.ownerName,
        email: active.ownerEmail,
        role: 'owner',
        practiceId: active.id,
      }
    : demoUser;

  const allPractices = [
    { id: 'demo', name: 'Bright Smile Dental (Demo)' },
    ...store.practices.map((p) => ({ id: p.id, name: p.name })),
  ];

  const switchPractice = useCallback(
    (id: string) => {
      update((prev) => ({ ...prev, activePracticeId: id }));
    },
    [update]
  );

  const createPractice = useCallback(
    (data: CreatePracticeInput): string => {
      const id = makeId();
      const practice: StoredPractice = {
        id,
        ...data,
        createdAt: new Date().toISOString().split('T')[0],
        onboarding: emptyOnboarding(),
      };
      update((prev) => ({
        activePracticeId: id,
        practices: [...prev.practices, practice],
      }));
      return id;
    },
    [update]
  );

  const deletePractice = useCallback(
    (id: string) => {
      update((prev) => ({
        activePracticeId: prev.activePracticeId === id ? 'demo' : prev.activePracticeId,
        practices: prev.practices.filter((p) => p.id !== id),
      }));
    },
    [update]
  );

  const onboardingState = active?.onboarding ?? null;

  const setOnboardingStep = useCallback(
    (step: number) => {
      update((prev) =>
        updateActivePractice(prev, (p) => ({
          ...p,
          onboarding: { ...p.onboarding, currentStep: step },
        }))
      );
    },
    [update]
  );

  const completeOnboarding = useCallback(() => {
    update((prev) =>
      updateActivePractice(prev, (p) => ({
        ...p,
        onboarding: {
          ...p.onboarding,
          currentStep: 6,
          completedAt: new Date().toISOString().split('T')[0],
        },
      }))
    );
  }, [update]);

  const toggleItem = useCallback(
    (pillar: PillarSlug, itemId: string) => {
      if (pillar === 'alma') return; // use toggleAlmaItem instead
      const key = pillar === 'giselle' ? 'giselle' : pillar === 'miles' ? 'miles' : 'devon';
      update((prev) =>
        updateActivePractice(prev, (p) => ({
          ...p,
          onboarding: {
            ...p.onboarding,
            [key]: { ...p.onboarding[key], [itemId]: !p.onboarding[key][itemId] },
          },
        }))
      );
    },
    [update]
  );

  const getItemEnabled = useCallback(
    (pillar: PillarSlug, itemId: string): boolean => {
      if (!active) return true; // demo shows everything as-is
      const key = pillar === 'giselle' ? 'giselle' : pillar === 'miles' ? 'miles' : 'devon';
      return !!active.onboarding[key][itemId];
    },
    [active]
  );

  const toggleAlmaItem = useCallback(
    (category: 'programs' | 'rolePaths' | 'sops', id: string) => {
      update((prev) =>
        updateActivePractice(prev, (p) => ({
          ...p,
          onboarding: {
            ...p.onboarding,
            alma: {
              ...p.onboarding.alma,
              [category]: { ...p.onboarding.alma[category], [id]: !p.onboarding.alma[category][id] },
            },
          },
        }))
      );
    },
    [update]
  );

  const getAlmaItemEnabled = useCallback(
    (category: 'programs' | 'rolePaths' | 'sops', id: string): boolean => {
      if (!active) return true;
      return !!active.onboarding.alma[category][id];
    },
    [active]
  );

  return (
    <PracticeContext.Provider
      value={{
        activePractice,
        activeUser,
        isDemo,
        allPractices,
        switchPractice,
        createPractice,
        deletePractice,
        onboardingState,
        setOnboardingStep,
        completeOnboarding,
        toggleItem,
        getItemEnabled,
        toggleAlmaItem,
        getAlmaItemEnabled,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice(): PracticeContextValue {
  const ctx = useContext(PracticeContext);
  if (!ctx) throw new Error('usePractice must be used within PracticeProvider');
  return ctx;
}
