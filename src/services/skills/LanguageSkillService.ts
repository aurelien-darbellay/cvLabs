import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { LanguageSkill, LanguageSkillRow } from "@/domain/LanguageSkill";
export type LanguageSkillInsertDto = Omit<LanguageSkillRow, "id">;
export type LanguageSkillUpdateDto = Partial<LanguageSkillInsertDto>;

export const languageSkillService = new CrudTranslatableService<
  LanguageSkill,
  LanguageSkillRow,
  any, // No translations for LanguageSkill
  LanguageSkillInsertDto,
  LanguageSkillUpdateDto
>(
  "language_skills",
  "language_skill_id",
  "language_skills_translations", // No translation table
  "export-language-skills",
  LanguageSkill.fromRow
);
