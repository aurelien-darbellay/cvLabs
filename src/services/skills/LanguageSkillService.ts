import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { LanguageSkill, LanguageSkillRow } from "@/domain/LanguageSkill";
import {
  LanguageSkillInCv,
  LanguageSkillInCvRow,
} from "@/domain/elementsInCv/LanguageSkillInCv";
import { ApiEndpoints } from "@/config/ApiEndpoints";

export type LanguageSkillInsertDto = Omit<LanguageSkillRow, "id">;
export type LanguageSkillUpdateDto = Partial<LanguageSkillInsertDto>;

class LanguageSkillService extends CrudTranslatableService<
  LanguageSkill,
  LanguageSkillRow,
  any, // No translations for LanguageSkill
  LanguageSkillInsertDto,
  LanguageSkillUpdateDto
> {
  constructor() {
    super(
      "language_skills",
      "language_skill_id",
      "language_skills_translations", // No translation table
      LanguageSkill.fromRow
    );
  }

  async getAll(ownerId: string | null): Promise<LanguageSkill[]> {
    if (!ownerId) {
      throw new Error("Owner ID is required to fetch language skills");
    }
    const url = `${ApiEndpoints.EXPORT_LANGUAGE_SKILLS}?owner_id=${ownerId}`;
    return fetch(url, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data.map(LanguageSkill.fromRow));
  }
}

export const languageSkillService = new LanguageSkillService();
