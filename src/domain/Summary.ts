import { Asset } from "./Asset";
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

export class Summary extends Asset<SummaryInCv> {
  constructor(
    public id: number,
    public shortDescription: string | null,
    public translatedFields: SummaryTranslatedField[]
  ) {
    super();
  }

  static fromRow(row: SummaryRow): Summary {
    return new Summary(
      row.id,
      row.short_description ?? null,
      (row.summary_translations || []).map(SummaryTranslatedField.fromRow)
    );
  }

  static deSerialize(data: Summary): Summary {
    return new Summary(
      data.id,
      data.shortDescription ?? null,
      data.translatedFields
    );
  }

  /**
   * Converts Summary to SummaryInCv using its translated fields.
   */
  override prepForCv(): SummaryInCv {
    return new SummaryInCv(
      this.id,
      "",
      this.translatedFields?.[0]?.content ?? null
    );
  }
}
