import { Asset } from "./Asset";
import { LanguageInCv } from "./elementsInCv/LanguageInCv";

export interface LanguageRow {
  id: number;
  name: string;
  code: string;
}

export class Language extends Asset<LanguageInCv> {
  constructor(public id: number, public name: string, public code: string) {
    super();
  }

  static fromRow(row: LanguageRow): Language {
    return new Language(row.id, row.name, row.code);
  }

  static deSerialize(data: Language): Language {
    return new Language(data.id, data.name, data.code);
  }

  override prepForCv(): LanguageInCv {
    return new LanguageInCv(this.id, this.name, this.code, "");
  }
}
