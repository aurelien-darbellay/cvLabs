import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface EducationTranslatedFieldRow extends TranslatedFieldRow {
  id: number;
  education_id: number;
  lang_code: string;
  title: string;
  description: string;
}

export class EducationTranslatedField extends TranslatedField {
  constructor(
    id: number,
    domainId: number,
    langCode: string,
    public title: string,
    public description: string
  ) {
    super(id, domainId, langCode);
  }

  static fromRow(row: EducationTranslatedFieldRow): EducationTranslatedField {
    return new EducationTranslatedField(
      row.id,
      row.education_id,
      row.lang_code,
      row.title,
      row.description
    );
  }
}
