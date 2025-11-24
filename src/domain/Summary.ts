export interface SummaryRow {
  id: number;
  owner_id: string;
  user_id: string;
  // Augmented field from translation
  content?: string;
}

export class Summary {
  constructor(
    public id: number,
    public ownerId: string,
    public userId: string,
    public content: string | null
  ) { }

  static fromRow(row: SummaryRow): Summary {
    return new Summary(
      row.id,
      row.owner_id,
      row.user_id,
      row.content ?? null
    );
  }
}
