import { CrudService } from "@/services/base/CrudService";
import { Education, type EducationRow } from "@/domain/Education";

export type EducationInsertDto = Omit<EducationRow, "id" | "owner_id">;
export type EducationUpdateDto = Partial<EducationInsertDto>;

export const educationService = new CrudService<Education, EducationRow, EducationInsertDto, EducationUpdateDto>(
  "education",
  Education.fromRow
);
