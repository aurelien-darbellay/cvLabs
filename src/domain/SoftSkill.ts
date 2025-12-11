export interface SoftSkillInCvRow {
  id: number;
  key: string;
}

export class SoftSkillInCv {
  constructor(public id: number, public key: string) {}

  static fromRow(row: SoftSkillInCvRow): SoftSkillInCv {
    return new SoftSkillInCv(row.id, row.key);
  }
}
