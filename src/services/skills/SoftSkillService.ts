import { CrudService } from "@/services/base/CrudService";
import { SoftSkill, type SoftSkillRow } from "@/domain/SoftSkill";

export type SoftSkillInsertDto = Omit<SoftSkillRow, "id">;
export type SoftSkillUpdateDto = Partial<SoftSkillInsertDto>;

export const softSkillService = new CrudService<
  SoftSkill,
  SoftSkillRow,
  SoftSkillInsertDto,
  SoftSkillUpdateDto
>("softskills", SoftSkill.fromRow);
