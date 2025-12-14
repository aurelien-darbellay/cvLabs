import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface SoftSkillTranslatedFieldRow extends TranslatedFieldRow {
  id: number;
  softskill_id: number;
  lang_code: string;
  name: string;
}

export class SoftSkillTranslatedField extends TranslatedField {
  constructor(
    id: number,
    domainId: number,
    langCode: string,
    public name: string
  ) {
    super(id, domainId, langCode);
  }

  static fromRow(row: SoftSkillTranslatedFieldRow): SoftSkillTranslatedField {
    return new SoftSkillTranslatedField(
      row.id,
      row.softskill_id,
      row.lang_code,
      row.name
    );
  }
}
