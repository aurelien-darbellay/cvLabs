import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { Summary, type SummaryRow } from "@/domain/Summary";
import { SummaryTranslatedFieldRow } from "@/domain/translations";

export type SummaryInsertDto = Omit<
  SummaryRow,
  "id" | "summary_translations"
>;
export type SummaryUpdateDto = Partial<SummaryInsertDto>;

export const summaryService = new CrudTranslatableService<
  Summary,
  SummaryRow,
  SummaryTranslatedFieldRow,
  SummaryInsertDto,
  SummaryUpdateDto
>(
  "summaries",
  "summary_id",
  "summaries_translations",
  "export-summaries",
  Summary.fromRow
);
