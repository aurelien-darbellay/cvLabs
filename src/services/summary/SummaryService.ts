import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { SummaryInCv, type SummaryInCvRow, Summary } from "@/domain/Summary";
import { ApiEndpoints } from "@/config/ApiEndpoints";
import { SummaryTranslatedFieldRow } from "@/domain/translations";

export type SummaryInsertDto = Omit<SummaryInCvRow, "id" | "owner_id">;
export type SummaryUpdateDto = Partial<SummaryInsertDto>;

class SummaryService extends CrudTranslatableService<
  SummaryInCv,
  SummaryInCvRow,
  SummaryTranslatedFieldRow,
  SummaryInsertDto,
  SummaryUpdateDto
> {
  constructor() {
    super(
      "summaries",
      "summary_id",
      "summaries_translations",
      SummaryInCv.fromRow
    );
  }

  // Override with getAll method
  async getAll(id: string | null): Promise<Summary[]> {
    if (!id) {
      throw new Error("User ID is required to fetch summary data");
    }
    const url = `${ApiEndpoints.EXPORT_SUMMARIES}?owner_id=${id}`;
    return fetch(url, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          const responseText = response.text().then((text) => {
            return text;
          });
          throw new Error(
            `HTTP error! status: ${response.status}, content: ${responseText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        return data.map(Summary.fromRow);
      });
  }
}

export const summaryService = new SummaryService();
