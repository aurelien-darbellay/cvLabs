export interface TechSkillRow {
  id: number;
  owner_id: string;
  name: string;
}

export class TechSkill {
  constructor(public id: number, public ownerId: string, public name: string) {}

  static fromRow(row: TechSkillRow): TechSkill {
    return new TechSkill(row.id, row.owner_id, row.name);
  }
}
