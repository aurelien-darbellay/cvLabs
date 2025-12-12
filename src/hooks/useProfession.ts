import { useAsync } from "./useAsync";
import { professionService } from "@/services/profession/ProfessionService";
import { Profession } from "@/domain/Profession";

export function useProfessionList(userId: string | null | undefined) {
  const { data, loading, error } = useAsync<Profession[]>(async () => {
    if (!userId) return [];
    return professionService.getAll(userId);
  }, [userId]);
  return {
    professions: data ?? [],
    loading,
    error,
  };
}
