export interface EducationRow {
  id: number;
  owner_id: string;
  user_id: string;
  institution: string | null;
  start_year: number | null;
  end_year: number | null;
  // Augmented fields from translation
  title?: string;
  description?: string;
}

export class Education {
  constructor(
    public id: number,
    public ownerId: string,
    public userId: string,
    public institution: string | null,
    public startYear: number | null,
    public endYear: number | null,
    public title?: string,
    public description?: string
  ) { }

  static fromRow(row: EducationRow): Education {
    return new Education(
      row.id,
      row.owner_id,
      row.user_id,
      row.institution,
      row.start_year,
      row.end_year,
      row.title,
      row.description
    );
  }
}
