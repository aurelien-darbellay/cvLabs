import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import {
  ProfessionInCv,
  type ProfessionInCvRow,
} from "@/domain/elementsInCv/ProfessionInCv";
import { Profession } from "@/domain/Profession";
import { ApiEndpoints } from "@/config/ApiEndpoints";
import { ProfessionTranslatedFieldRow } from "@/domain/translations";

export type ProfessionInsertDto = Omit<ProfessionInCvRow, "id" | "owner_id">;
export type ProfessionUpdateDto = Partial<ProfessionInsertDto>;

class ProfessionService extends CrudTranslatableService<
  ProfessionInCv,
  ProfessionInCvRow,
  ProfessionTranslatedFieldRow,
  ProfessionInsertDto,
  ProfessionUpdateDto
> {
  constructor() {
    super(
      "professions",
      "profession_id",
      "professions_translations",
      ProfessionInCv.fromRow
    );
  }

  // Override only the list method
  async getAll(id: string | null): Promise<Profession[]> {
    if (!id) {
      throw new Error("User ID is required to fetch profession data");
    }
    const url = `${ApiEndpoints.EXPORT_PROFESSION}?owner_id=${id}`;
    return fetch(url, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          const responseText = response.text().then((text) => {
            return text;
          });
          throw new Error(
            `HTTP error! status: ${response.status}, content: ${responseText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        return data.map(Profession.fromRow);
      });
  }
}

export const professionService = new ProfessionService();
