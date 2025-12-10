import { EducationTranslatedField } from "./translations/EducationTranslatedField";

export interface EducationRow {
  id: number;
  institution: string;
  start_year: number | null;
  end_year: number | null;
  education_translations?: any[];
}

export class Education {
  constructor(
    public id: number,
    public institution: string,
    public startYear: number | null,
    public endYear: number | null,
    public translatedFields: EducationTranslatedField[]
  ) {}

  static fromRow(row: EducationRow): Education {
    return new Education(
      row.id,
      row.institution,
      row.start_year,
      row.end_year,
      (row.education_translations || []).map(EducationTranslatedField.fromRow)
    );
  }
}
