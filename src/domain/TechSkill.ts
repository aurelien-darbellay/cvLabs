export interface TechSkillRow {
  id: number;
  name: string;
}

export class TechSkill {
  constructor(
    public id: number,
    public name: string
  ) {}

  static fromRow(row: TechSkillRow): TechSkill {
    return new TechSkill(row.id, row.name);
  }
}
