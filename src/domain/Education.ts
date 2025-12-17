import { Asset } from "./Asset";
import { EducationTranslatedField } from "./translations/EducationTranslatedField";
import { EducationInCv } from "./elementsInCv/EducationInCv";

export interface EducationRow {
  id: number;
  institution: string;
  start_year: number | null;
  end_year: number | null;
  education_translations?: any[];
}

export class Education extends Asset<EducationInCv> {
  constructor(
    public id: number,
    public institution: string,
    public startYear: number | null,
    public endYear: number | null,
    public translatedFields: EducationTranslatedField[]
  ) {
    super();
  }

  static fromRow(row: EducationRow): Education {
    return new Education(
      row.id,
      row.institution,
      row.start_year,
      row.end_year,
      (row.education_translations || []).map(EducationTranslatedField.fromRow)
    );
  }

  /**
   * Converts Education to EducationInCv using its translated fields.
   */
  override prepForCv(): EducationInCv {
    return new EducationInCv(
      this.id,
      "",
      this.institution,
      this.startYear,
      this.endYear,
      this.translatedFields?.[0]?.title,
      this.translatedFields?.[0]?.description
    );
  }
}
