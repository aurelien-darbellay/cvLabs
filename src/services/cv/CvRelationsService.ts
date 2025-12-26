import { EducationInCv } from "@/domain/elementsInCv/EducationInCv";
import { ExperienceInCv } from "@/domain/elementsInCv/ExperienceInCv";
import { LanguageSkillInCvRow } from "@/domain/elementsInCv/LanguageSkillInCv";
import { ProfessionInCv } from "@/domain/elementsInCv/ProfessionInCv";
import { SoftSkillInCv } from "@/domain/elementsInCv/SoftSkillInCv";
import { SummaryInCv } from "@/domain/Summary";
import { TechSkill } from "@/domain/TechSkill";
import type { AssetCVRelation } from "@/services/base/CvRelationService";
import { CvRelationService } from "@/services/base/CvRelationService";

// CV relation row interfaces extending the shared AssetInCv
export interface CvExperienceRow extends AssetCVRelation {
  experience_id: number;
  position: number;
}

export interface CvEducationRow extends AssetCVRelation {
  education_id: number;
  position: number;
}

export interface CvTechSkillRow extends AssetCVRelation {
  techskill_id: number;
  position: number;
}

export interface CvSoftSkillRow extends AssetCVRelation {
  softskill_id: number;
  position: number;
}

export interface CvSummaryRow extends AssetCVRelation {
  summary_id: number;
}

export interface CvProfessionRow extends AssetCVRelation {
  profession_id: number;
}

export interface CvLanguageInCvRow extends AssetCVRelation {
  language_skill_id: number;
  position: number;
}

// Export typed relation services per asset type
export const cvExperienceRelations = new CvRelationService<
  CvExperienceRow,
  ExperienceInCv
>("cv_experience", "experience_id");
export const cvEducationRelations = new CvRelationService<
  CvEducationRow,
  EducationInCv
>("cv_education", "education_id");
export const cvTechSkillRelations = new CvRelationService<
  CvTechSkillRow,
  TechSkill
>("cv_techskills", "techskill_id");
export const cvSoftSkillRelations = new CvRelationService<
  CvSoftSkillRow,
  SoftSkillInCv
>("cv_softskills", "softskill_id");
export const cvSummaryRelations = new CvRelationService<
  CvSummaryRow,
  SummaryInCv
>("cv_summaries", "summary_id", { orderByPosition: false });
export const cvProfessionRelations = new CvRelationService<
  CvProfessionRow,
  ProfessionInCv
>("cv_profession", "profession_id", { orderByPosition: false });
export const cvLanguageRelations = new CvRelationService<
  CvLanguageInCvRow,
  LanguageSkillInCvRow
>("cv_language_skills", "language_skill_id");

export const cvRelationsService = {};
