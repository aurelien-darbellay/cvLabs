import { ExperienceTranslatedField } from "./translations/ExperienceTranslatedField";

export interface ExperienceRow {
  id: number;
  company: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  technologies: string[];
  clients: string[];
  experience_translations?: any[];
}

export class Experience {
  constructor(
    public id: number,
    public company: string,
    public startDate: Date | null,
    public endDate: Date | null,
    public isCurrent: boolean,
    public technologies: string[],
    public clients: string[],
    public translatedFields: ExperienceTranslatedField[]
  ) {}

  static fromRow(row: ExperienceRow): Experience {
    return new Experience(
      row.id,
      row.company,
      row.start_date ? new Date(row.start_date) : null,
      row.end_date ? new Date(row.end_date) : null,
      !!row.is_current,
      row.technologies || [],
      row.clients || [],
      (row.experience_translations || []).map(ExperienceTranslatedField.fromRow)
    );
  }
}
