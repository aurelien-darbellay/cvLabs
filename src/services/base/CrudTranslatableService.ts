import { supabase } from "@/lib/supabaseClient";
import { CrudService } from "./CrudService";
import { TranslatedFieldRow } from "@/domain/translations";

export interface TranslatableRow {
  id: number | string;
}


export class CrudTranslatableService<
  TDomain extends { id: number | string },
  TRow extends TranslatableRow,
  TTranslatedRow extends TranslatedFieldRow,
  InsertDto = Omit<TRow, "id" | "owner_id" | "created_at" | "updated_at">,
  UpdateDto = Partial<InsertDto>
> extends CrudService<TDomain, TRow, InsertDto, UpdateDto> {
  constructor(
    tableName: string,
    private readonly translationTableName: string,
    mapRow: (row: TRow) => TDomain
  ) {
    super(tableName, mapRow);
  }

  /**
   * Create a translation for a domain entity
   * @param domainId The ID of the domain entity
   * @param langCode The language code
   * @param translation The translation data (without domain_id and lang_code)
   */
  async createTranslation(
    domainId: number | string,
    langCode: string,
    translation: Omit<TTranslatedRow, "id" | "owner_id" | `${string}_id` | "lang_code">
  ): Promise<TTranslatedRow> {
    const payload = {
      ...translation,
      [`${this.tableName.slice(0, -1)}_id`]: domainId, // e.g., experience_id, education_id
      lang_code: langCode,
    };

    const { data, error } = await supabase
      .from(this.translationTableName)
      .insert(payload as any)
      .select("*")
      .single();

    if (error) {
      console.error(
        `Error creating translation in ${this.translationTableName}:`,
        {
          message: error.message,
          code: error.code,
          details: error.details,
        }
      );
      throw error;
    }
    return data as TTranslatedRow;
  }

  /**
   * Get translation for a domain entity and language
   * @param domainId The ID of the domain entity
   * @param langCode The language code
   */
  async getTranslation(
    domainId: number | string,
    langCode: string
  ): Promise<TTranslatedRow | null> {
    const { data, error } = await supabase
      .from(this.translationTableName)
      .select("*")
      .eq(`${this.tableName.slice(0, -1)}_id`, domainId)
      .eq("lang_code", langCode)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error(
        `Error fetching translation from ${this.translationTableName}:`,
        {
          message: error.message,
          code: error.code,
          details: error.details,
        }
      );
      throw error;
    }
    return (data as TTranslatedRow) || null;
  }

  /**
   * Update translation for a domain entity and language
   * @param domainId The ID of the domain entity
   * @param langCode The language code
   * @param updates The translation updates
   */
  async updateTranslation(
    domainId: number | string,
    langCode: string,
    updates: Partial<Omit<TTranslatedRow, "id" | "owner_id" | `${string}_id` | "lang_code">>
  ): Promise<TTranslatedRow> {
    const { data, error } = await supabase
      .from(this.translationTableName)
      .update(updates as any)
      .eq(`${this.tableName.slice(0, -1)}_id`, domainId)
      .eq("lang_code", langCode)
      .select("*")
      .single();

    if (error) {
      console.error(
        `Error updating translation in ${this.translationTableName}:`,
        {
          message: error.message,
          code: error.code,
          details: error.details,
        }
      );
      throw error;
    }
    return data as TTranslatedRow;
  }

  /**
   * Delete translation for a domain entity and language
   * @param domainId The ID of the domain entity
   * @param langCode The language code
   */
  async deleteTranslation(
    domainId: number | string,
    langCode: string
  ): Promise<void> {
    const { error } = await supabase
      .from(this.translationTableName)
      .delete()
      .eq(`${this.tableName.slice(0, -1)}_id`, domainId)
      .eq("lang_code", langCode);

    if (error) {
      console.error(
        `Error deleting translation from ${this.translationTableName}:`,
        {
          message: error.message,
          code: error.code,
          details: error.details,
        }
      );
      throw error;
    }
  }

  /**
   * Get all translations for a domain entity across all languages
   * @param domainId The ID of the domain entity
   */
  async getTranslations(domainId: number | string): Promise<TTranslatedRow[]> {
    const { data, error } = await supabase
      .from(this.translationTableName)
      .select("*")
      .eq(`${this.tableName.slice(0, -1)}_id`, domainId);

    if (error) {
      console.error(
        `Error fetching translations from ${this.translationTableName}:`,
        {
          message: error.message,
          code: error.code,
          details: error.details,
        }
      );
      throw error;
    }
    return (data as TTranslatedRow[]) || [];
  }
}
