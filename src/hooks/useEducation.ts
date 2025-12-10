import { useAsync } from "./useAsync";
import { educationService } from "@/services/education/EducationService";
import type { EducationInCv } from "@/domain/EducationInCv";

export function useEducationList(deps: any[] = []) {
  const { data, loading, error } = useAsync<EducationInCv[]>(
    () => educationService.list(),
    deps
  );
  return {
    education: data ?? [],
    loading,
    error,
  };
}
