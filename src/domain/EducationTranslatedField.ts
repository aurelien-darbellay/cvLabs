export interface EducationTranslatedFieldRow {
  education_id: string;
  lang_code: string;
  title: string;
  description: string;
}

export class EducationTranslatedField {
  constructor(
    public educationId: string,
    public langCode: string,
    public title: string,
    public description: string
  ) {}

  static fromRow(row: EducationTranslatedFieldRow): EducationTranslatedField {
    return new EducationTranslatedField(
      row.education_id,
      row.lang_code,
      row.title,
      row.description
    );
  }
}
