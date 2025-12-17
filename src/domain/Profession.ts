import { ProfessionTranslatedField } from "./translations/ProfessionTranslatedField";

export interface ProfessionRow {
  id: number;
  identifier: string;
  profession_translations?: any[];
}

export class Profession {
  constructor(
    public id: number,
    public identifier: string,
    public translatedFields: ProfessionTranslatedField[]
  ) {}

  static fromRow(row: ProfessionRow): Profession {
    return new Profession(
      row.id,
      row.identifier,
      (row.profession_translations || []).map(ProfessionTranslatedField.fromRow)
    );
  }
}
