import { Asset } from "./Asset";
import { ProfessionTranslatedField } from "./translations/ProfessionTranslatedField";
import { ProfessionInCv } from "./elementsInCv/ProfessionInCv";

export interface ProfessionRow {
  id: number;
  identifier: string;
  profession_translations?: any[];
}

export class Profession extends Asset<ProfessionInCv> {
  constructor(
    public id: number,
    public identifier: string,
    public translatedFields: ProfessionTranslatedField[]
  ) {
    super(id);
  }

  static fromRow(row: ProfessionRow): Profession {
    return new Profession(
      row.id,
      row.identifier,
      (row.profession_translations || []).map(ProfessionTranslatedField.fromRow)
    );
  }

  static deSerialize(data: Profession): Profession {
    return new Profession(data.id, data.identifier, data.translatedFields);
  }

  /**
   * Converts Profession to ProfessionInCv using its translated fields.
   */
  override prepForCv(): ProfessionInCv {
    return new ProfessionInCv(
      this.id,
      "",
      this.translatedFields?.[0]?.title ?? null,
      this.translatedFields?.[0]?.description ?? null
    );
  }
}
