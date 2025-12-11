import { CrudTranslatableService } from "@/services/base/CrudTranslatableService";
import {
  ExperienceInCv,
  type ExperienceInCvRow,
} from "@/domain/ExperienceInCv";
import { Experience } from "@/domain/Experience";
import { ApiEndpoints } from "@/config/ApiEndpoints";
import { ExperienceTranslatedFieldRow } from "@/domain/translations";

export type ExperienceInsertDto = Omit<
  ExperienceInCvRow,
  "id" | "owner_id" | "created_at"
>;
export type ExperienceUpdateDto = Partial<ExperienceInsertDto>;

class ExperienceService extends CrudTranslatableService<
  ExperienceInCv,
  ExperienceInCvRow,
  ExperienceTranslatedFieldRow,
  ExperienceInsertDto,
  ExperienceUpdateDto
> {
  constructor() {
    super(
      "experience",
      "experience_id",
      "experience_translations",
      ExperienceInCv.fromRow
    );
  }

  // Override only the list method
  async getAll(id: string | null): Promise<Experience[]> {
    /* console.log("ExperienceService getAll called");
    console.log("Fetching experience for user ID:", id); */
    if (!id) {
      throw new Error("User ID is required to fetch experience data");
    }
    const url = `${ApiEndpoints.EXPORT_EXPERIENCE}?owner_id=${id}`;
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
        return data.map(Experience.fromRow);
      });
  }
}

export const experienceService = new ExperienceService();
