import { useAsync } from "./useAsync";
import { experienceService } from "@/services/experience/ExperienceService";
import type { ExperienceInCv } from "@/domain/ExperienceInCv";

export function useExperienceList(deps: any[] = []) {
  const { data, loading, error } = useAsync<ExperienceInCv[]>(
    () => experienceService.list(),
    deps
  );
  return {
    experience: data ?? [],
    loading,
    error,
  };
}
