/**
 * Base interface for all translated field row types from the database
 * All translation tables follow the pattern: {entity}_id, lang_code, ...other fields
 */
export interface TranslatedFieldRow {
  lang_code: string;
  [key: string]: any;
}

/**
 * Base class for all translated fields
 * Common structure: domainId (the ID of the main entity), langCode, and translated content
 */
export abstract class TranslatedField {
  constructor(public domainId: number, public langCode: string) {}

  /**
   * Factory method to create domain object from database row
   * Must be implemented by subclasses
   */
  static fromRow(row: TranslatedFieldRow): TranslatedField {
    throw new Error("fromRow must be implemented by subclass");
  }
}
