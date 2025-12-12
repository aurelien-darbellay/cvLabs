import { ProfessionTranslatedField } from "./translations/ProfessionTranslatedField";

export interface ProfessionRow {
  id: number;
  profession_translations?: any[];
}

export class Profession {
  constructor(
    public id: number,
    public translatedFields: ProfessionTranslatedField[]
  ) {}

  static fromRow(row: ProfessionRow): Profession {
    return new Profession(
      row.id,
      (row.profession_translations || []).map(ProfessionTranslatedField.fromRow)
    );
  }
}
