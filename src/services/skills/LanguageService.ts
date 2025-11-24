import { CrudService } from "@/services/base/CrudService";
import { Language, type LanguageRow } from "@/domain/Language";

export type LanguageInsertDto = Omit<LanguageRow, "id">;
export type LanguageUpdateDto = Partial<LanguageInsertDto>;

export const languageService = new CrudService<
  Language,
  LanguageRow,
  LanguageInsertDto,
  LanguageUpdateDto
>("languages", Language.fromRow);
