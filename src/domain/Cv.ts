export interface CvRow {
  id: number;
  owner_id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export class Cv {
  constructor(
    public id: number,
    public ownerId: string,
    public userId: string,
    public title: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) { }

  static fromRow(row: CvRow): Cv {
    return new Cv(
      row.id,
      row.owner_id,
      row.user_id,
      row.title,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }
}
