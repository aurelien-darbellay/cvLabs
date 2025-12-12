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

export interface SoftSkillRow {
  id: number;
  owner_id: string;
  key: string;
  softskill_translations: any[];
}

export class SoftSkill {
  constructor(
    public id: number,
    public ownerId: string,
    public key: string,
    public translatedFields: any[]
  ) {}

  static fromRow(row: SoftSkillRow): SoftSkill {
    return new SoftSkill(
      row.id,
      row.owner_id,
      row.key,
      row.softskill_translations || []
    );
  }
}
