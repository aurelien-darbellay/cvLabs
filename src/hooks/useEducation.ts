import { useAsync } from "./useAsync";
import { educationService } from "@/services/education/EducationService";
import { Education } from "@/domain/Education";

export function useEducationList(userId: string | null | undefined) {
  const { data, loading, error } = useAsync<Education[]>(async () => {
    if (!userId) return [];
    return educationService.list(userId);
  }, [userId]);

  return {
    education: data ?? [],
    loading,
    error,
  };
}
