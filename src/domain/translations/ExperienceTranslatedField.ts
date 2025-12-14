import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface ExperienceTranslatedFieldRow extends TranslatedFieldRow {
  id: number;
  experience_id: number;
  lang_code: string;
  job_title: string;
  description: string;
  skills: string[];
}

export class ExperienceTranslatedField extends TranslatedField {
  constructor(
    id: number,
    domainId: number,
    langCode: string,
    public jobTitle: string,
    public description: string,
    public skills: string[]
  ) {
    super(id, domainId, langCode);
  }

  static fromRow(row: ExperienceTranslatedFieldRow): ExperienceTranslatedField {
    return new ExperienceTranslatedField(
      row.id,
      row.experience_id,
      row.lang_code,
      row.job_title,
      row.description,
      row.skills || []
    );
  }
}
