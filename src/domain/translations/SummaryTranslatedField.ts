import { TranslatedField, type TranslatedFieldRow } from "./TranslatedField";

export interface SummaryTranslatedFieldRow extends TranslatedFieldRow {
  summary_id: number;
  lang_code: string;
  content: string;
}

export class SummaryTranslatedField extends TranslatedField {
  constructor(domainId: number, langCode: string, public content: string) {
    super(domainId, langCode);
  }

  static fromRow(row: SummaryTranslatedFieldRow): SummaryTranslatedField {
    return new SummaryTranslatedField(
      row.summary_id,
      row.lang_code,
      row.content
    );
  }
}
