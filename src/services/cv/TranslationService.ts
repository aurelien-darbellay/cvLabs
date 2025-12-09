import { supabase } from "@/lib/supabaseClient";
import { Experience } from "@/domain/Experience";
import { Education } from "@/domain/Education";
import { Summary } from "@/domain/Summary";
import { SoftSkill } from "@/domain/SoftSkill";
import { Profession } from "@/domain/Profession";
import { CvLanguage } from "@/domain/CvLanguage";

export class TranslationService {
  async getExperienceForCv(
    cvId: number,
    langCode: string
  ): Promise<Experience[]> {
    // First, get all experience_ids from cv_experiences
    const { data: cvExperiencesData, error: cvExperiencesError } =
      await supabase
        .from("cv_experience")
        .select(
          "experience_id, experience(id, owner_id, company, start_date, end_date, is_current, technologies, clients, created_at)"
        )
        .eq("cv_id", cvId)
        .eq("visible", true);

    if (cvExperiencesError || !cvExperiencesData) {
      console.error("Error fetching cv_experiences:", cvExperiencesError);
      return [];
    }

    // Then, for each experience, get the translation
    const experiences: Experience[] = [];
    for (const cvExp of cvExperiencesData) {
      const experienceId = cvExp.experience_id;
      const experienceBase = cvExp.experience as any;

      const { data: translationData, error: translationError } = await supabase
        .from("experience_translations")
        .select("job_title, description, skills")
        .eq("experience_id", experienceId)
        .eq("lang_code", langCode)
        .single();

      if (translationError) {
        console.error(
          "Error fetching experience translation:",
          translationError
        );
        // Add experience without translation
        experiences.push(
          new Experience(
            experienceBase.id,
            experienceBase.owner_id,
            experienceBase.user_id,
            experienceBase.company,
            experienceBase.start_date
              ? new Date(experienceBase.start_date)
              : null,
            experienceBase.end_date ? new Date(experienceBase.end_date) : null,
            experienceBase.is_current,
            [],
            experienceBase.clients || [],
            new Date(experienceBase.created_at)
          )
        );
        continue;
      }

      experiences.push(
        new Experience(
          experienceBase.id,
          experienceBase.owner_id,
          experienceBase.user_id,
          experienceBase.company,
          experienceBase.start_date
            ? new Date(experienceBase.start_date)
            : null,
          experienceBase.end_date ? new Date(experienceBase.end_date) : null,
          experienceBase.is_current,
          translationData?.skills || experienceBase.technologies || [],
          experienceBase.clients || [],
          new Date(experienceBase.created_at),
          translationData?.job_title,
          translationData?.description
        )
      );
    }

    return experiences;
  }

  async getEducationForCv(
    cvId: number,
    langCode: string
  ): Promise<Education[]> {
    // First, get all education_ids from cv_education
    const { data: cvEducationData, error: cvEducationError } = await supabase
      .from("cv_education")
      .select(
        "education_id, education(id, owner_id, institution, start_year, end_year)"
      )
      .eq("cv_id", cvId)
      .eq("visible", true);

    if (cvEducationError || !cvEducationData) {
      console.error("Error fetching cv_education:", cvEducationError);
      return [];
    }

    // Then, for each education, get the translation
    const educations: Education[] = [];
    for (const cvEdu of cvEducationData) {
      const educationId = cvEdu.education_id;
      const educationBase = cvEdu.education as any;

      const { data: translationData, error: translationError } = await supabase
        .from("education_translations")
        .select("title, description")
        .eq("education_id", educationId)
        .eq("lang_code", langCode)
        .single();

      if (translationError) {
        console.error(
          "Error fetching education translation:",
          translationError
        );
        // Add education without translation
        educations.push(
          new Education(
            educationBase.id,
            educationBase.owner_id,
            educationBase.user_id,
            educationBase.institution,
            educationBase.start_year,
            educationBase.end_year
          )
        );
        continue;
      }

      educations.push(
        new Education(
          educationBase.id,
          educationBase.owner_id,
          educationBase.user_id,
          educationBase.institution,
          educationBase.start_year,
          educationBase.end_year,
          translationData?.title,
          translationData?.description
        )
      );
    }
    return educations;
  }

  async getSummaryForCv(
    cvId: number,
    langCode: string
  ): Promise<Summary | null> {
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

  async getTranslatedSoftSkills(
    userId: string,
    langCode: string
  ): Promise<SoftSkill[]> {
    const { data, error } = await supabase
      .from("softskills")
      .select(
        `
        *,
        softskill_translations!inner (
          name
        )
      `
      )
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

  async getProfessionForCv(
    cvId: number,
    langCode: string
  ): Promise<Profession | null> {
    // First, get the profession_id from cv_profession
    const { data: cvProfessionData, error: cvProfessionError } = await supabase
      .from("cv_profession")
      .select("profession_id, professions(id, owner_id)")
      .eq("cv_id", cvId)
      .eq("visible", true)
      .single();

    if (cvProfessionError || !cvProfessionData) {
      console.error("Error fetching cv_profession:", cvProfessionError);
      return null;
    }

    const professionId = cvProfessionData.profession_id;
    const professionBase = cvProfessionData.professions as any;

    // Then, get the translation for that profession
    const { data: translationData, error: translationError } = await supabase
      .from("professions_translations")
      .select("title, description")
      .eq("profession_id", professionId)
      .eq("lang_code", langCode)
      .single();

    if (translationError) {
      console.error("Error fetching profession translation:", translationError);
      // Return profession without title/description if translation not found
      return new Profession(
        professionBase.id,
        professionBase.owner_id,
        null,
        null
      );
    }

    return new Profession(
      professionBase.id,
      professionBase.owner_id,
      translationData?.title ?? null,
      translationData?.description ?? null
    );
  }

  async getLanguagesForCv(
    cvId: number,
    langCode: string
  ): Promise<CvLanguage[] | null> {
    // First, get the profession_id from cv_profession
    const { data: languageData, error: languageError } = await supabase
      .from("cv_languages")
      .select("language_id,level")
      .eq("cv_id", cvId)
      .eq("visible", true);

    if (languageError || !languageData) {
      console.error("Error fetching cv_languages:", languageError);
      return null;
    }

    const languages: CvLanguage[] = [];
    for (const cvLang of languageData) {
      const languageId = cvLang.language_id;
      const level = cvLang.level as any;

      const { data: translatedName, error: nameError } = await supabase
        .from("languages_translations")
        .select("name")
        .eq("language_id", languageId)
        .eq("lang_code", langCode)
        .single();

      const { data: translatedLevel, error: levelError } = await supabase
        .from("languages_level_translations")
        .select("name")
        .eq("level_code", level)
        .eq("lang_code", langCode)
        .single();

      if (nameError || levelError) {
        console.error(
          "Error fetching language or level translation:",
          nameError || levelError
        );
        // Add education without translation
        languages.push(new CvLanguage(languageId, "Unknown", level, level));
        continue;
      }

      languages.push(
        new CvLanguage(
          languageId,
          translatedName?.name ?? "Unknown",
          level,
          translatedLevel?.name ?? level
        )
      );
    }
    return languages;
  }
}

export const translationService = new TranslationService();
