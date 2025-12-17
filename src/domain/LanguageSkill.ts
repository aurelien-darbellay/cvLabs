import { Asset } from "./Asset";
import { LanguageSkillInCv } from "./elementsInCv/LanguageSkillInCv";
import { LanguageSkillTranslatedField } from "./translations";

export interface LanguageSkillRow {
  id: number;
  lang_code: string;
  level_code: string;
  language_skill_translations?: any[];
}

export class LanguageSkill extends Asset<LanguageSkillInCv> {
  constructor(
    public id: number,
    public langCode: string,
    public levelCode: string,
    public translatedFields: LanguageSkillTranslatedField[]
  ) {
    super(id);
  }

  static fromRow(row: LanguageSkillRow): LanguageSkill {
    return new LanguageSkill(
      row.id,
      row.lang_code,
      row.level_code,
      row.language_skill_translations?.map(
        LanguageSkillTranslatedField.fromRow
      ) || []
    );
  }

  static deSerialize(data: LanguageSkill): LanguageSkill {
    return new LanguageSkill(
      data.id,
      data.langCode,
      data.levelCode,
      data.translatedFields
    );
  }

  override prepForCv(): LanguageSkillInCv {
    return new LanguageSkillInCv(
      this.id,
      this.translatedFields[0].langSkillName,
      this.levelCode,
      this.translatedFields[0].levelName
    );
  }
}
