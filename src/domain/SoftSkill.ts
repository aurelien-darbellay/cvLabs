import { Asset } from "./Asset";
import { SoftSkillInCv } from "./elementsInCv/SoftSkillInCv";
import { SoftSkillTranslatedField } from "./translations/SoftSkillTranslatedField";

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
    public translatedFields: SoftSkillTranslatedField[]
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

  static deSerialize(data: SoftSkill): SoftSkill {
    return new SoftSkill(
      data.id,
      data.ownerId,
      data.key,
      data.translatedFields
    );
  }

  /**
   * Converts SoftSkill to SoftSkillInCv.
   */
  override prepForCv(): SoftSkillInCv {
    console.log("Preparing SoftSkill for CV:", this);
    return new SoftSkillInCv(
      this.id,
      this.translatedFields?.[0]?.name || this.key
    );
  }
}
