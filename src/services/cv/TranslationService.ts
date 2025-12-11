import { supabase } from "@/lib/supabaseClient";
import { ExperienceInCv } from "@/domain/ExperienceInCv";
import { EducationInCv } from "@/domain/EducationInCv";
import { SummaryInCv } from "@/domain/Summary";
import { SoftSkillInCv } from "@/domain/SoftSkill";
import { Profession } from "@/domain/Profession";
import { CvLanguage } from "@/domain/CvLanguage";
import { cvRelationsService } from "./CvRelationsService";

export class TranslationService {
  async getExperienceForCv(
    cvId: number,
    langCode: string
  ): Promise<ExperienceInCv[]> {
    // First, get all experience_ids from cv_experiences
    const cvExperiencesData = await cvRelationsService.getExperienceForCv(cvId);
    console.log("cvExperiencesData:", cvExperiencesData);

    // Then, for each experience, get the translation
    const experiences: ExperienceInCv[] = [];
    for (const cvExp of cvExperiencesData) {
      const experienceId = cvExp.id;

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
      }
      cvExp.job_title = translationData?.job_title;
      cvExp.description = translationData?.description;
      cvExp.technologies = translationData?.skills;
      experiences.push(ExperienceInCv.fromRow(cvExp));
    }

    return experiences;
  }

  async getEducationForCv(
    cvId: number,
    langCode: string
  ): Promise<EducationInCv[]> {
    // First, get all education_ids from cv_education
    const cvEducationData = await cvRelationsService.getEducationForCv(cvId);

    // Then, for each education, get the translation
    const educations: EducationInCv[] = [];
    for (const cvEdu of cvEducationData) {
      const educationId = cvEdu.id;

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
      }
      cvEdu.title = translationData?.title;
      cvEdu.description = translationData?.description;

      educations.push(EducationInCv.fromRow(cvEdu));
    }
    return educations;
  }

  async getSummaryForCv(
    cvId: number,
    langCode: string
  ): Promise<SummaryInCv | null> {
    // First, get the summary_id from cv_summaries
    const { data: cvSummaryData, error: cvSummaryError } = await supabase
      .from("cv_summaries")
      .select("summary_id, summaries(id,owner_id)")
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
      return new SummaryInCv(summaryBase.id, summaryBase.owner_id, null);
    }

    return new SummaryInCv(
      summaryBase.id,
      summaryBase.owner_id,
      translationData?.content ?? null
    );
  }

  async getSoftSkillsForCv(
    cvId: number,
    langCode: string
  ): Promise<SoftSkillInCv[]> {
    const softSkillsData = await cvRelationsService.getSoftSkillsForCv(cvId);
    const softSkills: SoftSkillInCv[] = [];
    for (const skill of softSkillsData) {
      //console.log("Soft skill before translation:", skill);
      const { data: translationData, error: translationError } = await supabase
        .from("softskill_translations")
        .select("name")
        .eq("softskill_id", skill.id)
        .eq("lang_code", langCode)
        .single();

      if (translationError) {
        console.error(
          "Error fetching translated soft skills:",
          translationError
        );
      }
      skill.key = translationData?.name ?? skill.key;
      softSkills.push(SoftSkillInCv.fromRow(skill));
    }

    return softSkills;
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
