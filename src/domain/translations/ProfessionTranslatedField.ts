import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface ProfessionTranslatedFieldRow extends TranslatedFieldRow {
  profession_id: number;
  lang_code: string;
  title: string;
  description: string;
}

export class ProfessionTranslatedField extends TranslatedField {
  constructor(
    domainId: number,
    langCode: string,
    public title: string,
    public description: string
  ) {
    super(domainId, langCode);
  }

  static fromRow(row: ProfessionTranslatedFieldRow): ProfessionTranslatedField {
    return new ProfessionTranslatedField(
      row.profession_id,
      row.lang_code,
      row.title,
      row.description
    );
  }
}
