import { useAsync } from "./useAsync";
import { educationService } from "@/services/education/EducationService";
import { Education } from "@/domain/Education";

export function useEducationList(deps: any[] = []) {
  const { data, loading, error } = useAsync<Education[]>(
    () => educationService.getAll(deps[0]),
    deps
  );
  return {
    education: data ?? [],
    loading,
    error,
  };
}
