import { CrudService } from "@/services/base/CrudService";
import { TechSkill, type TechSkillRow } from "@/domain/TechSkill";

export type TechSkillInsertDto = Omit<TechSkillRow, "id">;
export type TechSkillUpdateDto = Partial<TechSkillInsertDto>;

export const techSkillService = new CrudService<
  TechSkill,
  TechSkillRow,
  TechSkillInsertDto,
  TechSkillUpdateDto
>("techskills", TechSkill.fromRow);
