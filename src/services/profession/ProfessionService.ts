import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import { Profession, ProfessionRow } from "@/domain/Profession";
import { ProfessionTranslatedFieldRow } from "@/domain/translations";

export type ProfessionInsertDto = Omit<ProfessionRow, "id" | "owner_id">;
export type ProfessionUpdateDto = Partial<ProfessionInsertDto>;

export const professionService = new CrudTranslatableService<
  Profession,
  ProfessionRow,
  ProfessionTranslatedFieldRow,
  ProfessionInsertDto,
  ProfessionUpdateDto
>(
  "professions",
  "profession_id",
  "professions_translations",
  "export-professions",
  Profession.fromRow
);
