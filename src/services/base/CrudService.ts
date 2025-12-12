import { supabase } from "@/lib/supabaseClient";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface Identifiable {
  id: number | string;
}

export class CrudService<
  TDomain extends Identifiable,
  TRow extends { id: number | string },
  InsertDto = Omit<TRow, "id" | "owner_id" | "created_at" | "updated_at">,
  UpdateDto = Partial<InsertDto>
> {
  constructor(
    protected readonly tableName: string,
    protected readonly mapRow: (row: TRow) => TDomain
  ) {}

  async list(): Promise<TDomain[]> {
    const { data, error } = await supabase.from(this.tableName).select("*");
    if (error) throw error;
    return ((data as TRow[] | null) ?? []).map(this.mapRow);
  }

  async getById(id: number | string): Promise<TDomain | null> {
    const { data, error }: PostgrestSingleResponse<TRow> = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }
    if (!data) return null;
    return this.mapRow(data);
  }

  async create(payload: InsertDto): Promise<TDomain> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(payload as any)
      .select("*")
      .single();

    if (error) throw error;
    return this.mapRow(data as TRow);
  }

  async update(id: number | string, payload: UpdateDto): Promise<TDomain> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(payload as any)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return this.mapRow(data as TRow);
  }

  async delete(id: number | string): Promise<void> {
    const { error } = await supabase.from(this.tableName).delete().eq("id", id);

    if (error) throw error;
  }
}
