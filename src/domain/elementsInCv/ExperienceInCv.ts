export interface ExperienceInCvRow {
  id: number;
  owner_id: string;
  company: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  technologies: string[] | null;
  clients: string[] | null;
  created_at: string;
  // Augmented fields from translation
  job_title?: string;
  description?: string;
}

export class ExperienceInCv {
  constructor(
    public id: number,
    public ownerId: string,
    public company: string | null,
    public startDate: Date | null,
    public endDate: Date | null,
    public isCurrent: boolean,
    public technologies: string[],
    public clients: string[],
    public createdAt: Date,
    public jobTitle?: string,
    public description?: string
  ) {}

  static fromRow(row: ExperienceInCvRow): ExperienceInCv {
    return new ExperienceInCv(
      row.id,
      row.owner_id,
      row.company,
      row.start_date ? new Date(row.start_date) : null,
      row.end_date ? new Date(row.end_date) : null,
      row.is_current,
      row.technologies ?? [],
      row.clients ?? [],
      new Date(row.created_at),
      row.job_title,
      row.description
    );
  }
}
