import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface ProfessionTranslatedFieldRow extends TranslatedFieldRow {
  id: number;
  profession_id: number;
  lang_code: string;
  title: string;
  description: string;
}

export class ProfessionTranslatedField extends TranslatedField {
  constructor(
    id: number,
    domainId: number,
    langCode: string,
    public title: string,
    public description: string
  ) {
    super(id, domainId, langCode);
  }

  static fromRow(row: ProfessionTranslatedFieldRow): ProfessionTranslatedField {
    return new ProfessionTranslatedField(
      row.id,
      row.profession_id,
      row.lang_code,
      row.title,
      row.description
    );
  }
}
