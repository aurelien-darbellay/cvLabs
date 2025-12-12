import { SummaryTranslatedField } from "./translations/SummaryTranslatedField";

export interface SummaryInCvRow {
  id: number;
  owner_id: string;
  user_id: string;
  // Augmented field from translation
  content?: string;
}

export class SummaryInCv {
  constructor(
    public id: number,
    public ownerId: string,
    public content: string | null
  ) {}

  static fromRow(row: SummaryInCvRow): SummaryInCv {
    return new SummaryInCv(row.id, row.owner_id, row.content ?? null);
  }
}

export interface SummaryRow {
  id: number;
  short_description?: string;
  summary_translations?: any[];
}

export class Summary {
  constructor(
    public id: number,
    public shortDescription: string | null,
    public translatedFields: SummaryTranslatedField[]
  ) {}

  static fromRow(row: SummaryRow): Summary {
    return new Summary(
      row.id,
      row.short_description ?? null,
      (row.summary_translations || []).map(SummaryTranslatedField.fromRow)
    );
  }
}
