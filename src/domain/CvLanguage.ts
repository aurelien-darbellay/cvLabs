export interface CvLanguageRow {
  id: number;
  name: string;
  level_code: string;
  level_name: string;
}

export class CvLanguage {
  constructor(
    public id: number,
    public name: string,
    public level_code: string,
    public level_name: string
  ) {}

  static fromRow(row: CvLanguageRow): CvLanguage {
    return new CvLanguage(row.id, row.name, row.level_code, row.level_name);
  }
}
