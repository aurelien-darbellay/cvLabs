import { CrudService } from "@/services/base/CrudService";
import { Experience, type ExperienceRow } from "@/domain/Experience";

export type ExperienceInsertDto = Omit<ExperienceRow, "id" | "owner_id" | "created_at">;
export type ExperienceUpdateDto = Partial<ExperienceInsertDto>;

export const experienceService = new CrudService<
  Experience,
  ExperienceRow,
  ExperienceInsertDto,
  ExperienceUpdateDto
>("experience", Experience.fromRow);
