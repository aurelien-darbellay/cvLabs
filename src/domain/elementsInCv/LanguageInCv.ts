export interface LanguageInCV {
  id: number;
  name: string;
  level_code: string;
  level_name: string;
}

export class LanguageInCv {
  constructor(
    public id: number,
    public name: string,
    public level_code: string,
    public level_name: string
  ) {}

  static fromRow(row: LanguageInCV): LanguageInCv {
    return new LanguageInCv(row.id, row.name, row.level_code, row.level_name);
  }
}
