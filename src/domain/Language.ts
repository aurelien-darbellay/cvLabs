export interface LanguageRow {
  id: number;
  name: string;
  code: string;
}

export class Language {
  constructor(
    public id: number,
    public name: string,
    public code: string,
  ) { }

  static fromRow(row: LanguageRow): Language {
    return new Language(row.id, row.name, row.code);
  }
}
