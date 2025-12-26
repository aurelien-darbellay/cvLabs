import { AssetType } from "./assets.js";

const tableMap: Record<AssetType, { table: string; field: string }> = {
  education: { table: "cv_education", field: "education_id" },
  experience: { table: "cv_experience", field: "experience_id" },
  profession: { table: "cv_profession", field: "profession_id" },
  techskills: { table: "cv_techskills", field: "techskill_id" },
  softskills: { table: "cv_softskills", field: "softskill_id" },
  summaries: { table: "cv_summaries", field: "summary_id" },
  languageskills: {
    table: "cv_language_skills",
    field: "language_skill_id",
  },
};

export default tableMap;
