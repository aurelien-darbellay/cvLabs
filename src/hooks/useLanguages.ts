import { useAsync } from "./useAsync";
import { languageService } from "@/services/language/LanguageService";
import type { Language } from "@/domain/Language";

export function useLanguages(deps: any[] = []) {
  const { data, loading, error } = useAsync<Language[]>(
    () => languageService.list(),
    deps
  );
  return {
    languages: data ?? [],
    loading,
    error,
  };
}
