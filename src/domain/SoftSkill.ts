import { Asset } from "./Asset";
import { SoftSkillInCv } from "./elementsInCv/SoftSkillInCv";

export interface SoftSkillRow {
  id: number;
  owner_id: string;
  key: string;
  softskill_translations: any[];
}

export class SoftSkill extends Asset<SoftSkillInCv> {
  constructor(
    public id: number,
    public ownerId: string,
    public key: string,
    public translatedFields: any[]
  ) {
    super();
  }

  static fromRow(row: SoftSkillRow): SoftSkill {
    return new SoftSkill(
      row.id,
      row.owner_id,
      row.key,
      row.softskill_translations || []
    );
  }

  /**
   * Converts SoftSkill to SoftSkillInCv.
   */
  override prepForCv(): SoftSkillInCv {
    return new SoftSkillInCv(this.id, this.key);
  }
}
