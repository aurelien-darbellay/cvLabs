import type { AssetType } from "@/types/assets";
import type { CrudService } from "@/services/base/CrudService";
import { educationService } from "@/services/education/EducationService";
import { experienceService } from "@/services/experience/ExperienceService";
import { professionService } from "@/services/profession/ProfessionService";
import { summaryService } from "@/services/summary/SummaryService";
import { softSkillService } from "@/services/skills/SoftSkillService";
import { techSkillService } from "@/services/skills/TechSkillService";
import { languageSkillService } from "../skills/LanguageSkillService";
import {
  cvEducationRelations,
  cvExperienceRelations,
  cvLanguageRelations,
  cvProfessionRelations,
  cvSoftSkillRelations,
  cvSummaryRelations,
  cvTechSkillRelations,
} from "../cv/CvRelationsService";
import { CvRelationService } from "../base/CvRelationService";

export interface AssetServiceEntry {
  service: CrudService<any, any, any, any>;
  translatable: boolean;
  relationservice: CvRelationService<any, any> | null;
  positionned: boolean;
}

export const assetServiceRegistry: Record<AssetType, AssetServiceEntry> = {
  education: {
    service: educationService,
    translatable: true,
    relationservice: cvEducationRelations,
    positionned: true,
  },
  experience: {
    service: experienceService,
    translatable: true,
    relationservice: cvExperienceRelations,
    positionned: true,
  },
  summaries: {
    service: summaryService,
    translatable: true,
    relationservice: cvSummaryRelations,
    positionned: false,
  },
  softskills: {
    service: softSkillService,
    translatable: true,
    relationservice: cvSoftSkillRelations,
    positionned: true,
  },
  techskills: {
    service: techSkillService,
    translatable: false,
    relationservice: cvTechSkillRelations,
    positionned: true,
  },
  languageskills: {
    service: languageSkillService,
    translatable: true,
    relationservice: cvLanguageRelations,
    positionned: true,
  },
  profession: {
    service: professionService,
    translatable: false,
    relationservice: cvProfessionRelations,
    positionned: false,
  },
};

export function getAssetServiceEntry(
  assetType: AssetType
): AssetServiceEntry | null {
  return assetServiceRegistry[assetType] ?? null;
}

export function isTranslatableAssetType(assetType: AssetType): boolean {
  return assetServiceRegistry[assetType]?.translatable ?? false;
}
