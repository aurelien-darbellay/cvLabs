import { CrudService } from "@/services/base/CrudService";
import { EducationInCv, type EducationInCvRow } from "@/domain/EducationInCv";

export type EducationInsertDto = Omit<EducationInCvRow, "id" | "owner_id">;
export type EducationUpdateDto = Partial<EducationInsertDto>;

export const educationService = new CrudService<
  EducationInCv,
  EducationInCvRow,
  EducationInsertDto,
  EducationUpdateDto
>("education", EducationInCv.fromRow);
