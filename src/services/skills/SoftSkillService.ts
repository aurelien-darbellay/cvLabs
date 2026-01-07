import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { SoftSkill, type SoftSkillRow } from "@/domain/SoftSkill";
import { TranslatedFieldRow } from "@/domain/translations";
import { ApiEndpoints } from "@/config/ApiEndpoints";

export type SoftSkillInsertDto = Omit<
  SoftSkillRow,
  "id" | "owner_id" | "softskill_translations"
>;
export type SoftSkillUpdateDto = Partial<SoftSkillInsertDto>;

// SoftSkill translations table row structure
interface SoftSkillTranslatedFieldRow extends TranslatedFieldRow {
  softskill_id: number;
  lang_code: string;
  name: string;
}

class SoftSkillService extends CrudTranslatableService<
  SoftSkill,
  SoftSkillRow,
  SoftSkillTranslatedFieldRow,
  SoftSkillInsertDto,
  SoftSkillUpdateDto
> {
  constructor() {
    super(
      "softskills",
      "softskill_id",
      "softskill_translations",
      SoftSkill.fromRow
    );
  }

  async getAll(id: string | null): Promise<SoftSkill[]> {
    if (!id) {
      throw new Error("User ID is required to fetch education data");
    }
    const url = `${ApiEndpoints.EXPORT_SOFTSKILLS}?owner_id=${id}`;
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
        return data.map(SoftSkill.fromRow);
      });
  }
}

export const softSkillService = new SoftSkillService();
