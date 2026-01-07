import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { Experience, type ExperienceRow } from "@/domain/Experience";
import { ExperienceTranslatedFieldRow } from "@/domain/translations";

export type ExperienceInsertDto = Omit<
  ExperienceRow,
  "id" | "experience_translations"
>;
export type ExperienceUpdateDto = Partial<ExperienceInsertDto>;

export const experienceService = new CrudTranslatableService<
  Experience,
  ExperienceRow,
  ExperienceTranslatedFieldRow,
  ExperienceInsertDto,
  ExperienceUpdateDto
>(
  "experience",
  "experience_id",
  "experience_translations",
  "export-experience",
  Experience.fromRow
);
