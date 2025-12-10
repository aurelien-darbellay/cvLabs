import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { SoftSkillInCv, type SoftSkillInCvRow } from "@/domain/SoftSkill";
import { TranslatedFieldRow } from "@/domain/translations";

export type SoftSkillInsertDto = Omit<SoftSkillInCvRow, "id">;
export type SoftSkillUpdateDto = Partial<SoftSkillInsertDto>;

// SoftSkill translations table row structure
interface SoftSkillTranslatedFieldRow extends TranslatedFieldRow {
  softskill_id: number;
  lang_code: string;
  name: string;
}

class SoftSkillService extends CrudTranslatableService<
  SoftSkillInCv,
  SoftSkillInCvRow,
  SoftSkillTranslatedFieldRow,
  SoftSkillInsertDto,
  SoftSkillUpdateDto
> {
  constructor() {
    super("softskills", "softskills_translations", SoftSkillInCv.fromRow);
  }
}

export const softSkillService = new SoftSkillService();
