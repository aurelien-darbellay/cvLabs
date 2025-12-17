import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface LanguageSkillTranslatedFieldRow extends TranslatedFieldRow {
  id: number;
  language_skill_id: number;
  lang_code: string;
  lang_skill_name: string;
  level_name: string;
}

export class LanguageSkillTranslatedField extends TranslatedField {
  constructor(
    id: number,
    domainId: number,
    langCode: string,
    public langSkillName: string,
    public levelName: string
  ) {
    super(id, domainId, langCode);
  }

  static fromRow(
    row: LanguageSkillTranslatedFieldRow
  ): LanguageSkillTranslatedField {
    return new LanguageSkillTranslatedField(
      row.id,
      row.language_skill_id,
      row.lang_code,
      row.lang_skill_name,
      row.level_name
    );
  }
}
