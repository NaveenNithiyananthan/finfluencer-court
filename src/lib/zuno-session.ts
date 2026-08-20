import { useCallback, useEffect, useState } from "react";
import type { Declaration } from "./zuno-data";

export interface ZunoSession {
  declaration: Declaration | null;
  selectedScenario: string | null;
  stressTestCompleted: boolean;
  portfolioViewed: boolean;
  courtProgress: { completed: number; score: number; max: number };
  educationalConcepts: string[];
}

const STORAGE_KEY = "zuno-session-v1";

export const emptySession: ZunoSession = {
  declaration: null,
  selectedScenario: null,
  stressTestCompleted: false,
  portfolioViewed: false,
  courtProgress: { completed: 0, score: 0, max: 0 },
  educationalConcepts: [],
};

function readSession(): ZunoSession {
  if (typeof window === "undefined") return emptySession;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return emptySession;
    return { ...emptySession, ...JSON.parse(saved) } as ZunoSession;
  } catch {
    return emptySession;
  }
}

function persist(session: ZunoSession) {
  if (typeof window !== "undefined")
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function useZunoSession() {
  const [session, setSession] = useState<ZunoSession>(emptySession);

  useEffect(() => setSession(readSession()), []);

  const update = useCallback((change: (current: ZunoSession) => ZunoSession) => {
    setSession((current) => {
      const next = change(current);
      persist(next);
      return next;
    });
  }, []);

  return {
    session,
    saveDeclaration: useCallback(
      (declaration: Declaration) =>
        update((current) => ({
          ...current,
          declaration,
          stressTestCompleted: false,
          portfolioViewed: false,
          educationalConcepts: [],
        })),
      [update],
    ),
    markStressTestCompleted: useCallback(
      (concepts: string[], selectedScenario: string) =>
        update((current) => ({
          ...current,
          stressTestCompleted: true,
          educationalConcepts: concepts,
          selectedScenario,
        })),
      [update],
    ),
    markPortfolioViewed: useCallback(
      () => update((current) => ({ ...current, portfolioViewed: true })),
      [update],
    ),
    saveGoal: useCallback(
      (userGoal: Declaration["userGoal"]) =>
        update((current) =>
          current.declaration
            ? { ...current, declaration: { ...current.declaration, userGoal } }
            : current,
        ),
      [update],
    ),
    saveCourtProgress: useCallback(
      (completed: number, score: number, max: number) =>
        update((current) => ({ ...current, courtProgress: { completed, score, max } })),
      [update],
    ),
  };
}
