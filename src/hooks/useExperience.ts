import { useAsync } from "./useAsync";
import { experienceService } from "@/services/experience/ExperienceService";
import type { Experience } from "@/domain/Experience";

export function useExperienceList(deps: any[] = []) {
  const { data, loading, error } = useAsync<Experience[]>(
    () => experienceService.list(),
    deps
  );
  return {
    experience: data ?? [],
    loading,
    error,
  };
}
