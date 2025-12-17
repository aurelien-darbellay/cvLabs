import { Asset } from "./Asset";
import { ExperienceTranslatedField } from "./translations/ExperienceTranslatedField";
import { ExperienceInCv } from "./elementsInCv/ExperienceInCv";

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

export class Experience extends Asset<ExperienceInCv> {
  constructor(
    public id: number,
    public company: string,
    public startDate: Date | null,
    public endDate: Date | null,
    public isCurrent: boolean,
    public technologies: string[],
    public clients: string[],
    public translatedFields: ExperienceTranslatedField[]
  ) {
    super();
  }

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

  static deSerialize(data: Experience): Experience {
    return new Experience(
      data.id,
      data.company,
      data.startDate ? new Date(data.startDate) : null,
      data.endDate ? new Date(data.endDate) : null,
      data.isCurrent,
      data.technologies,
      data.clients,
      data.translatedFields
    );
  }

  /**
   * Converts Experience to ExperienceInCv using its translated fields.
   */
  prepForCv(): ExperienceInCv {
    return new ExperienceInCv(
      this.id,
      "",
      this.company,
      this.startDate,
      this.endDate,
      this.isCurrent,
      this.translatedFields?.[0]?.skills || this.technologies,
      this.clients,
      new Date(),
      this.translatedFields?.[0]?.jobTitle,
      this.translatedFields?.[0]?.description
    );
  }
}
