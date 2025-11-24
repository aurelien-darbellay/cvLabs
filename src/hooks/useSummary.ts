import { useAsync } from "./useAsync";
import { summaryService } from "@/services/summary/SummaryService";
import type { Summary } from "@/domain/Summary";

export function useSummaries() {
  const { data, loading, error } = useAsync<Summary[]>(() => summaryService.list(), []);
  return {
    summaries: data ?? [],
    loading,
    error
  };
}
