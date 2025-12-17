const SUPABASE_BASE_URL = "https://dzcwpglidnktkzlvojkq.supabase.co";
const FUNCTIONS_BASE_URL = `${SUPABASE_BASE_URL}/functions/v1`;

export class ApiEndpoints {
  static readonly EXPORT_EXPERIENCE = `${FUNCTIONS_BASE_URL}/export-experience`;
  static readonly EXPORT_EDUCATION = `${FUNCTIONS_BASE_URL}/export-education`;
  static readonly EXPORT_SUMMARIES = `${FUNCTIONS_BASE_URL}/export-summaries`;
  static readonly EXPORT_SOFTSKILLS = `${FUNCTIONS_BASE_URL}/export-softskill`;
  static readonly EXPORT_PROFESSION = `${FUNCTIONS_BASE_URL}/export-professions`;
  static readonly EXPORT_LANGUAGE_SKILLS = `${FUNCTIONS_BASE_URL}/export-language-skills`;
}
