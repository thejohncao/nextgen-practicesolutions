import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ngp_store';

export interface AlmaOnboarding {
  programs: Record<string, boolean>;
  rolePaths: Record<string, boolean>;
  sops: Record<string, boolean>;
}

export interface StoredPractice {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  locations: string[];
  plan: string;
  createdAt: string;
  onboarding: {
    currentStep: number;
    completedAt: string | null;
    giselle: Record<string, boolean>;
    miles: Record<string, boolean>;
    devon: Record<string, boolean>;
    alma: AlmaOnboarding;
  };
}

export interface NGPStore {
  activePracticeId: string;
  practices: StoredPractice[];
}

const DEFAULT_STORE: NGPStore = {
  activePracticeId: 'demo',
  practices: [],
};

function readStore(): NGPStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE;
    return JSON.parse(raw) as NGPStore;
  } catch {
    return DEFAULT_STORE;
  }
}

function writeStore(store: NGPStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function useLocalStorage() {
  const [store, setStore] = useState<NGPStore>(readStore);

  const update = useCallback((fn: (prev: NGPStore) => NGPStore) => {
    setStore((prev) => {
      const next = fn(prev);
      writeStore(next);
      return next;
    });
  }, []);

  return { store, update };
}
