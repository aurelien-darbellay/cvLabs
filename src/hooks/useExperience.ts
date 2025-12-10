import { useAsync } from "./useAsync";
import { experienceService } from "@/services/experience/ExperienceService";
import { Experience } from "@/domain/Experience";

export function useExperienceList(deps: any[] = []) {
  const { data, loading, error } = useAsync<Experience[]>(
    () => experienceService.getAll(deps[0]),
    deps
  );
  // console.log("Experience data:", data);
  return {
    experience: data ?? [],
    loading,
    error,
  };
}
