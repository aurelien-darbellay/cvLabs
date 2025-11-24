import { useAsync } from "./useAsync";
import { cvService } from "@/services/cv/CvService";
import type { Cv } from "@/domain/Cv";

export function useCvs() {
  const { data, loading, error } = useAsync<Cv[]>(() => cvService.list(), []);
  return {
    cvs: data ?? [],
    loading,
    error
  };
}
