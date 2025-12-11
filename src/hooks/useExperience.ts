import { useAsync } from "./useAsync";
import { experienceService } from "@/services/experience/ExperienceService";
import { Experience } from "@/domain/Experience";

export function useExperienceList(userId: string | null | undefined) {
  const { data, loading, error } = useAsync<Experience[]>(
    async () => {
      if (!userId) return [];
      return experienceService.getAll(userId);
    },
    [userId]
  );
  return {
    experience: data ?? [],
    loading,
    error,
  };
}
