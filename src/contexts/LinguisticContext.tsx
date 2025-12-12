import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLanguages } from "@/hooks/useSkills";
import type { Language } from "@/domain/Language";

interface LinguisticContextValue {
  languages: Language[];
  loading: boolean;
  error: unknown;
}

const LinguisticContext = createContext<LinguisticContextValue | undefined>(
  undefined
);

export function LinguisticProvider({ children }: { children: ReactNode }) {
  const { languages, loading, error } = useLanguages();

  return (
    <LinguisticContext.Provider value={{ languages, loading, error }}>
      {children}
    </LinguisticContext.Provider>
  );
}

export function useLinguisticContext(): LinguisticContextValue {
  const ctx = useContext(LinguisticContext);
  if (!ctx) {
    throw new Error(
      "useLinguisticContext must be used within a LinguisticProvider"
    );
  }
  return ctx;
}
