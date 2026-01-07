import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { Education, type EducationRow } from "@/domain/Education";
import { EducationTranslatedFieldRow } from "@/domain/translations";

export type EducationInsertDto = Omit<
  EducationRow,
  "id" | "education_translations"
>;
export type EducationUpdateDto = Partial<EducationInsertDto>;

export const educationService = new CrudTranslatableService<
  Education,
  EducationRow,
  EducationTranslatedFieldRow,
  EducationInsertDto,
  EducationUpdateDto
>(
  "education",
  "education_id",
  "education_translations",
  "export-education",
  Education.fromRow
);
