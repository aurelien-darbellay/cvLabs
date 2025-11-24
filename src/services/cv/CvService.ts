import { CrudService } from "@/services/base/CrudService";
import { Cv, type CvRow } from "@/domain/Cv";
import { supabase } from "@/lib/supabaseClient";

export type CvInsertDto = Omit<CvRow, "id" | "owner_id" | "created_at" | "updated_at">;
export type CvUpdateDto = Partial<CvInsertDto>;

export class CvService extends CrudService<Cv, CvRow, CvInsertDto, CvUpdateDto> {
  constructor() {
    super("cvs", Cv.fromRow);
  }

  async getAvailableLanguages(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("lang_code")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching available languages:", error);
      return [];
    }

    if (data) {
      return Array.from(new Set(data.map((d: { lang_code: string }) => d.lang_code)));
    }
    return [];
  }
}

export const cvService = new CvService();
