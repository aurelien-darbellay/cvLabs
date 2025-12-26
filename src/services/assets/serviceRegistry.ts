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
  relationService: CvRelationService<any, any> | null;
  positionned: boolean;
}

export const assetServiceRegistry: Record<AssetType, AssetServiceEntry> = {
  education: {
    service: educationService,
    translatable: true,
    relationService: cvEducationRelations,
    positionned: true,
  },
  experience: {
    service: experienceService,
    translatable: true,
    relationService: cvExperienceRelations,
    positionned: true,
  },
  summaries: {
    service: summaryService,
    translatable: true,
    relationService: cvSummaryRelations,
    positionned: false,
  },
  softskills: {
    service: softSkillService,
    translatable: true,
    relationService: cvSoftSkillRelations,
    positionned: true,
  },
  techskills: {
    service: techSkillService,
    translatable: false,
    relationService: cvTechSkillRelations,
    positionned: true,
  },
  languageskills: {
    service: languageSkillService,
    translatable: true,
    relationService: cvLanguageRelations,
    positionned: true,
  },
  profession: {
    service: professionService,
    translatable: false,
    relationService: cvProfessionRelations,
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
