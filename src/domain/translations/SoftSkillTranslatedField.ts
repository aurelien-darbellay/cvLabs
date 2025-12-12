import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface SoftSkillTranslatedFieldRow extends TranslatedFieldRow {
  softskill_id: number;
  lang_code: string;
  name: string;
}

export class SoftSkillTranslatedField extends TranslatedField {
  constructor(domainId: number, langCode: string, public name: string) {
    super(domainId, langCode);
  }

  static fromRow(row: SoftSkillTranslatedFieldRow): SoftSkillTranslatedField {
    return new SoftSkillTranslatedField(
      row.softskill_id,
      row.lang_code,
      row.name
    );
  }
}
