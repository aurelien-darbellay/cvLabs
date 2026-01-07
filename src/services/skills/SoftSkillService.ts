import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { SoftSkill, type SoftSkillRow } from "@/domain/SoftSkill";
import { TranslatedFieldRow } from "@/domain/translations";

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

export const softSkillService = new CrudTranslatableService<
  SoftSkill,
  SoftSkillRow,
  SoftSkillTranslatedFieldRow,
  SoftSkillInsertDto,
  SoftSkillUpdateDto
>(
  "softskills",
  "softskill_id",
  "softskill_translations",
  "export-softskill",
  SoftSkill.fromRow
);
