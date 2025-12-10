import { useAsync } from "./useAsync";
import { techSkillService } from "@/services/skills/TechSkillService";
import { softSkillService } from "@/services/skills/SoftSkillService";
import { languageService } from "@/services/skills/LanguageService";
import type { TechSkill } from "@/domain/TechSkill";
import type { SoftSkillInCv } from "@/domain/SoftSkill";
import type { Language } from "@/domain/Language";

export function useTechSkills(deps: any[] = []) {
  const { data, loading, error } = useAsync<TechSkill[]>(
    () => techSkillService.list(),
    deps
  );
  return {
    techSkills: data ?? [],
    loading,
    error,
  };
}

export function useSoftSkills(deps: any[] = []) {
  const { data, loading, error } = useAsync<SoftSkillInCv[]>(
    () => softSkillService.list(),
    deps
  );
  return {
    softSkills: data ?? [],
    loading,
    error,
  };
}

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
