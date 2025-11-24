import { useAsync } from "./useAsync";
import { experienceService } from "@/services/experience/ExperienceService";
import type { Experience } from "@/domain/Experience";

export function useExperienceList() {
  const { data, loading, error } = useAsync<Experience[]>(() => experienceService.list(), []);
  return {
    experience: data ?? [],
    loading,
    error
  };
}
