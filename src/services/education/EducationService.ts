import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { EducationInCv, type EducationInCvRow } from "@/domain/EducationInCv";
import { Education } from "@/domain/Education";
import { ApiEndpoints } from "@/config/ApiEndpoints";
import { EducationTranslatedFieldRow } from "@/domain/translations";

export type EducationInsertDto = Omit<EducationInCvRow, "id" | "owner_id">;
export type EducationUpdateDto = Partial<EducationInsertDto>;

class EducationService extends CrudTranslatableService<
  EducationInCv,
  EducationInCvRow,
  EducationTranslatedFieldRow,
  EducationInsertDto,
  EducationUpdateDto
> {
  constructor() {
    super(
      "education",
      "education_id",
      "education_translations",
      EducationInCv.fromRow
    );
  }

  async getAll(id: string | null): Promise<Education[]> {
    if (!id) {
      throw new Error("User ID is required to fetch education data");
    }
    const url = `${ApiEndpoints.EXPORT_EDUCATION}?owner_id=${id}`;
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
        return data.map(Education.fromRow);
      });
  }
}

export const educationService = new EducationService();
