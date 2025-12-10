import { CrudService } from "@/services/base/CrudService";
import {
  ExperienceInCv,
  type ExperienceInCvRow,
} from "@/domain/ExperienceInCv";

export type ExperienceInsertDto = Omit<
  ExperienceInCvRow,
  "id" | "owner_id" | "created_at"
>;
export type ExperienceUpdateDto = Partial<ExperienceInsertDto>;

export const experienceService = new CrudService<
  ExperienceInCv,
  ExperienceInCvRow,
  ExperienceInsertDto,
  ExperienceUpdateDto
>("experience", ExperienceInCv.fromRow);
