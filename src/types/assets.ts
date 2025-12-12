export type AssetType =
  | "education"
  | "experience"
  | "profession"
  | "techskills"
  | "softskills"
  | "summaries";

export const assetTypeLabels: Record<AssetType, string> = {
  education: "Education",
  experience: "Experience",
  profession: "Profession",
  techskills: "Tech Skills",
  softskills: "Soft Skills",
  summaries: "Summaries",
};

export function isAssetType(value: string | undefined): value is AssetType {
  if (!value) return false;
  return Object.keys(assetTypeLabels).includes(value);
}

export type FieldInputType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "date"
  | "tags";

export interface AssetFieldConfig {
  key: string;
  label: string;
  type: FieldInputType;
  translation?: boolean;
  optional?: boolean;
  placeholder?: string;
}

export interface AssetFormConfig {
  baseFields: AssetFieldConfig[];
  translationFields?: AssetFieldConfig[];
}

export const assetFormSchema: Record<AssetType, AssetFormConfig> = {
  education: {
    baseFields: [
      {
        key: "institution",
        label: "Institution",
        type: "text",
        optional: false,
      },
      {
        key: "startYear",
        label: "Start year",
        type: "number",
        optional: false,
      },
      {
        key: "endYear",
        label: "End year",
        type: "number",
        optional: false,
      },
    ],
    translationFields: [
      { key: "title", label: "Title", type: "text", translation: true },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        translation: true,
        optional: true,
      },
    ],
  },
  experience: {
    baseFields: [
      { key: "company", label: "Company", type: "text" },
      { key: "startDate", label: "Start date", type: "date", optional: true },
      { key: "endDate", label: "End date", type: "date", optional: true },
      { key: "isCurrent", label: "Currently working", type: "boolean" },
      {
        key: "technologies",
        label: "Technologies",
        type: "tags",
        optional: true,
      },
      { key: "clients", label: "Clients", type: "tags", optional: true },
    ],
    translationFields: [
      {
        key: "jobTitle",
        label: "Job title",
        type: "text",
        translation: true,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        translation: true,
        optional: true,
      },
      {
        key: "skills",
        label: "Skills",
        type: "tags",
        translation: true,
        optional: true,
      },
    ],
  },
  profession: {
    baseFields: [],
    translationFields: [
      { key: "title", label: "Title", type: "text", translation: true },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        translation: true,
        optional: true,
      },
    ],
  },
  techskills: {
    baseFields: [{ key: "name", label: "Name", type: "text" }],
  },
  softskills: {
    baseFields: [{ key: "key", label: "Key", type: "text" }],
    translationFields: [
      { key: "name", label: "Name", type: "text", translation: true },
    ],
  },
  summaries: {
    baseFields: [],
    translationFields: [
      {
        key: "content",
        label: "Content",
        type: "textarea",
        translation: true,
      },
    ],
  },
};
