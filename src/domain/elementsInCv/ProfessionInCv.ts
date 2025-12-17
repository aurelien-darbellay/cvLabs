export interface ProfessionInCvRow {
  id: number;
  owner_id: string;
  // Augmented fields from translation
  title?: string;
  description?: string;
}

export class ProfessionInCv {
  constructor(
    public id: number,
    public ownerId: string,
    public title: string | null,
    public description: string | null
  ) {}

  static fromRow(row: ProfessionInCvRow): ProfessionInCv {
    return new ProfessionInCv(
      row.id,
      row.owner_id,
      row.title ?? null,
      row.description ?? null
    );
  }
}
