import { CrudService } from "@/services/base/CrudService";
import { Summary, type SummaryRow } from "@/domain/Summary";

export type SummaryInsertDto = Omit<SummaryRow, "id" | "owner_id">;
export type SummaryUpdateDto = Partial<SummaryInsertDto>;

export const summaryService = new CrudService<Summary, SummaryRow, SummaryInsertDto, SummaryUpdateDto>(
  "summaries",
  Summary.fromRow
);
