import { useAsync } from "./useAsync";
import { summaryService } from "@/services/summary/SummaryService";
import type { SummaryInCv } from "@/domain/Summary";

export function useSummaries() {
  const { data, loading, error } = useAsync<SummaryInCv[]>(
    () => summaryService.list(),
    []
  );
  return {
    summaries: data ?? [],
    loading,
    error,
  };
}
