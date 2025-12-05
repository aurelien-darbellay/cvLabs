import { useAsync } from "./useAsync";
import { cvService } from "@/services/cv/CvService";
import type { Cv } from "@/domain/Cv";

export function useCvs(deps: any[] = []) {
  const { data, loading, error } = useAsync<Cv[]>(() => cvService.list(), deps);
  return {
    cvs: data ?? [],
    loading,
    error,
  };
}
