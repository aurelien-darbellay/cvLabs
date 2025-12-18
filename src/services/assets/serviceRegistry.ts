import type { AssetType } from "@/types/assets";
import type { CrudService } from "@/services/base/CrudService";
import { educationService } from "@/services/education/EducationService";
import { experienceService } from "@/services/experience/ExperienceService";
import { professionService } from "@/services/profession/ProfessionService";
import { summaryService } from "@/services/summary/SummaryService";
import { softSkillService } from "@/services/skills/SoftSkillService";
import { techSkillService } from "@/services/skills/TechSkillService";
import { languageSkillService } from "../skills/LanguageSkillService";

export interface AssetServiceEntry {
  service: CrudService<any, any, any, any>;
  translatable: boolean;
}

export const assetServiceRegistry: Record<AssetType, AssetServiceEntry> = {
  education: { service: educationService, translatable: true },
  experience: { service: experienceService, translatable: true },
  profession: { service: professionService, translatable: true },
  summaries: { service: summaryService, translatable: true },
  softskills: { service: softSkillService, translatable: true },
  techskills: { service: techSkillService, translatable: false },
  languageskills: { service: languageSkillService, translatable: true },
};

export function getAssetServiceEntry(
  assetType: AssetType
): AssetServiceEntry | null {
  return assetServiceRegistry[assetType] ?? null;
}

export function isTranslatableAssetType(assetType: AssetType): boolean {
  return assetServiceRegistry[assetType]?.translatable ?? false;
}
