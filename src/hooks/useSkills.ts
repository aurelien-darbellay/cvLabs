import { useAsync } from "./useAsync";
import { techSkillService } from "@/services/skills/TechSkillService";
import { softSkillService } from "@/services/skills/SoftSkillService";
import { languageService } from "@/services/skills/LanguageService";
import type { TechSkill } from "@/domain/TechSkill";
import type { SoftSkill } from "@/domain/SoftSkill";
import type { Language } from "@/domain/Language";

export function useTechSkills() {
  const { data, loading, error } = useAsync<TechSkill[]>(() => techSkillService.list(), []);
  return {
    techSkills: data ?? [],
    loading,
    error
  };
}

export function useSoftSkills() {
  const { data, loading, error } = useAsync<SoftSkill[]>(() => softSkillService.list(), []);
  return {
    softSkills: data ?? [],
    loading,
    error
  };
}

export function useLanguages() {
  const { data, loading, error } = useAsync<Language[]>(() => languageService.list(), []);
  return {
    languages: data ?? [],
    loading,
    error
  };
}
