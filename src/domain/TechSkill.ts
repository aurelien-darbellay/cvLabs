import { Asset } from "./Asset";

export interface TechSkillRow {
  id: number;
  owner_id: string;
  name: string;
}

export class TechSkill extends Asset<TechSkill> {
  constructor(public id: number, public ownerId: string, public name: string) {
    super(id);
  }

  static fromRow(row: TechSkillRow): TechSkill {
    return new TechSkill(row.id, row.owner_id, row.name);
  }

  static deSerialize(data: TechSkill): TechSkill {
    return new TechSkill(data.id, data.ownerId, data.name);
  }
  override prepForCv(): TechSkill {
    return this;
  }
}
