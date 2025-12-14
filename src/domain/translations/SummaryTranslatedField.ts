import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface SummaryTranslatedFieldRow extends TranslatedFieldRow {
  id: number;
  summary_id: number;
  lang_code: string;
  content: string;
}

export class SummaryTranslatedField extends TranslatedField {
  constructor(
    id: number,
    domainId: number,
    langCode: string,
    public content: string
  ) {
    super(id, domainId, langCode);
  }

  static fromRow(row: SummaryTranslatedFieldRow): SummaryTranslatedField {
    return new SummaryTranslatedField(
      row.id,
      row.summary_id,
      row.lang_code,
      row.content
    );
  }
}
