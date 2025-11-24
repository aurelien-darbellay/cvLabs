import { supabase } from "@/lib/supabaseClient";
import { Experience } from "@/domain/Experience";
import { Education } from "@/domain/Education";
import { Summary } from "@/domain/Summary";
import { SoftSkill } from "@/domain/SoftSkill";

export class TranslationService {
    async getTranslatedExperience(userId: string, langCode: string): Promise<Experience[]> {
        // Fetch experiences and join with translations
        const { data, error } = await supabase
            .from("experience")
            .select(`*, experience_translations!inner (job_title, description, skills)`)
            .eq("user_id", userId)
            .eq("experience_translations.lang_code", langCode)
            .order("start_date", { ascending: false });

        if (error) {
            console.error("Error fetching translated experience:", error);
            return [];
        }

        return data.map((row: any) => {
            const translation = row.experience_translations[0];
            return new Experience(
                row.id,
                row.owner_id,
                row.user_id,
                row.company,
                row.start_date ? new Date(row.start_date) : null,
                row.end_date ? new Date(row.end_date) : null,
                row.is_current,
                translation?.skills || row.technologies || [],
                row.clients || [],
                new Date(row.created_at),
                translation?.job_title,
                translation?.description
            );
        });
    }

    async getTranslatedEducation(userId: string, langCode: string): Promise<Education[]> {
        const { data, error } = await supabase
            .from("education")
            .select(`
        *,
        education_translations!inner (
          title,
          description
        )
      `)
            .eq("user_id", userId)
            .eq("education_translations.lang_code", langCode)
            .order("start_year", { ascending: false });

        if (error) {
            console.error("Error fetching translated education:", error);
            return [];
        }

        return data.map((row: any) => {
            const translation = row.education_translations[0];
            return new Education(
                row.id,
                row.owner_id,
                row.user_id,
                row.institution,
                row.start_year,
                row.end_year,
                translation?.title,
                translation?.description
            );
        });
    }

    async getSummaryForCv(cvId: number, langCode: string): Promise<Summary | null> {
        // First, get the summary_id from cv_summaries
        const { data: cvSummaryData, error: cvSummaryError } = await supabase
            .from("cv_summaries")
            .select("summary_id, summaries(id, user_id, owner_id)")
            .eq("cv_id", cvId)
            .eq("visible", true)
            .single();

        if (cvSummaryError || !cvSummaryData) {
            console.error("Error fetching cv_summary:", cvSummaryError);
            return null;
        }

        const summaryId = cvSummaryData.summary_id;
        const summaryBase = cvSummaryData.summaries as any;

        // Then, get the translation for that summary
        const { data: translationData, error: translationError } = await supabase
            .from("summaries_translations")
            .select("content")
            .eq("summary_id", summaryId)
            .eq("lang_code", langCode)
            .single();

        if (translationError) {
            console.error("Error fetching summary translation:", translationError);
            // Return summary without content if translation not found
            return new Summary(
                summaryBase.id,
                summaryBase.owner_id,
                summaryBase.user_id,
                null
            );
        }

        return new Summary(
            summaryBase.id,
            summaryBase.owner_id,
            summaryBase.user_id,
            translationData?.content ?? null
        );
    }

    async getTranslatedSoftSkills(userId: string, langCode: string): Promise<SoftSkill[]> {
        const { data, error } = await supabase
            .from("softskills")
            .select(`
        *,
        softskill_translations!inner (
          name
        )
      `)
            .eq("softskill_translations.lang_code", langCode);

        if (error) {
            console.error("Error fetching translated soft skills:", error);
            return [];
        }

        return data.map((row: any) => {
            const translation = row.softskill_translations[0];
            return new SoftSkill(row.id, translation.name);
        });
    }
}

export const translationService = new TranslationService();
