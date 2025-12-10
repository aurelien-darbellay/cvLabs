export interface ExperienceTranslatedFieldRow {
  experience_id: number;
  lang_code: string;
  job_title: string;
  description: string;
  skills: string[];
}

export class ExperienceTranslatedField {
  constructor(
    public experienceId: number,
    public langCode: string,
    public jobTitle: string,
    public description: string,
    public skills: string[]
  ) {}

  static fromRow(row: ExperienceTranslatedFieldRow): ExperienceTranslatedField {
    return new ExperienceTranslatedField(
      row.experience_id,
      row.lang_code,
      row.job_title,
      row.description,
      row.skills || []
    );
  }
}
