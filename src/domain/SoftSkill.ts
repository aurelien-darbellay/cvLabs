export interface SoftSkillRow {
  id: number;
  softskill_key: string;
}

export class SoftSkill {
  constructor(public id: number, public key: string) {}

  static fromRow(row: SoftSkillRow): SoftSkill {
    return new SoftSkill(row.id, row.softskill_key);
  }
}
