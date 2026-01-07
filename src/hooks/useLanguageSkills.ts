import { useAsync } from "./useAsync";
import { languageSkillService } from "@/services/skills/LanguageSkillService";
import type { LanguageSkill } from "@/domain/LanguageSkill";

export function useLanguageSkills(ownerId: string | null | undefined) {
  const { data, loading, error } = useAsync<LanguageSkill[]>(async () => {
    if (!ownerId) return [];
    return languageSkillService.list(ownerId);
  }, [ownerId]);
  return {
    languageSkills: data ?? [],
    loading,
    error,
  };
}
