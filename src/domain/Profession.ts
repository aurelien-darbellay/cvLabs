export interface ProfessionRow {
  id: number;
  owner_id: string;
  // Augmented fields from translation
  title?: string;
  description?: string;
}

export class Profession {
  constructor(
    public id: number,
    public ownerId: string,
    public title: string | null,
    public description: string | null
  ) {}

  static fromRow(row: ProfessionRow): Profession {
    return new Profession(
      row.id,
      row.owner_id,
      row.title ?? null,
      row.description ?? null
    );
  }
}
