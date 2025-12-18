export type AssetType =
  | "education"
  | "experience"
  | "profession"
  | "techskills"
  | "softskills"
  | "summaries"
  | "languageskills";

export type AssetEditMode = "base" | "translation";

export const assetTypeLabels: Record<AssetType, string> = {
  education: "Education",
  experience: "Experience",
  profession: "Profession",
  techskills: "Tech Skills",
  softskills: "Soft Skills",
  summaries: "Summaries",
  languageskills: "Language Skills",
};

export function isAssetType(value: string | undefined): value is AssetType {
  if (!value) return false;
  return Object.keys(assetTypeLabels).includes(value);
}

export const assetTypeSupportsTranslations: Record<AssetType, boolean> = {
  education: true,
  experience: true,
  profession: true,
  techskills: false,
  softskills: true,
  summaries: true,
  languageskills: true,
};

export type FieldInputType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "date"
  | "tags"
  | "select";

export interface AssetFieldConfig {
  key: string;
  label: string;
  type: FieldInputType;
  translation?: boolean;
  optional?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}
