export interface LanguageSkillInCvRow {
  id: number;
  name: string;
  level_code: string;
  level_name: string;
}

export class LanguageSkillInCv {
  constructor(
    public id: number,
    public name: string,
    public level_code: string,
    public level_name: string
  ) {}

  static fromRow(row: LanguageSkillInCvRow): LanguageSkillInCv {
    return new LanguageSkillInCv(
      row.id,
      row.name,
      row.level_code,
      row.level_name
    );
  }
}
