import { useAsync } from "./useAsync";
import { educationService } from "@/services/education/EducationService";
import type { Education } from "@/domain/Education";

export function useEducationList(deps: any[] = []) {
  const { data, loading, error } = useAsync<Education[]>(
    () => educationService.list(),
    deps
  );
  return {
    education: data ?? [],
    loading,
    error,
  };
}
