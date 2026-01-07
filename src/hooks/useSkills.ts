import { useAsync } from "./useAsync";
import { techSkillService } from "@/services/skills/TechSkillService";
import { softSkillService } from "@/services/skills/SoftSkillService";
import type { TechSkill } from "@/domain/TechSkill";
import type { SoftSkill } from "@/domain/SoftSkill";

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

export function useSoftSkills(ownerId: string | null | undefined) {
  const { data, loading, error } = useAsync<SoftSkill[]>(async () => {
    if (!ownerId) return [];
    return softSkillService.list(ownerId);
  }, [ownerId]);
  return {
    softSkills: data ?? [],
    loading,
    error,
  };
}
