import { useAsync } from "./useAsync";
import { summaryService } from "@/services/summary/SummaryService";
import type { Summary } from "@/domain/Summary";

export function useSummaries(userId: string | null | undefined) {
  const { data, loading, error } = useAsync<Summary[]>(async () => {
    if (!userId) return [];
    return summaryService.getAll(userId);
  }, [userId]);
  return {
    summaries: data ?? [],
    loading,
    error,
  };
}
