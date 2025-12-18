import type { AssetType, AssetFieldConfig } from "./assets";

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
      },
      {
        key: "startYear",
        label: "Start year",
        type: "number",
        optional: true,
      },
      {
        key: "endYear",
        label: "End year",
        type: "number",
        optional: true,
      },
    ],
    translationFields: [
      {
        key: "langCode",
        label: "Language",
        type: "select",
        placeholder: "Select a language",
        translation: true,
      },
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
        key: "langCode",
        label: "Language",
        type: "select",
        placeholder: "Select a language",
        translation: true,
      },
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
    baseFields: [{ key: "identifier", label: "Identifier", type: "text" }],
    translationFields: [
      {
        key: "langCode",
        label: "Language",
        type: "select",
        placeholder: "Select a language",
        translation: true,
      },
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
      {
        key: "langCode",
        label: "Language",
        type: "select",
        placeholder: "Select a language",
        translation: true,
      },
      { key: "name", label: "Name", type: "text", translation: true },
    ],
  },
  summaries: {
    baseFields: [
      { key: "shortDescription", label: "Short Description", type: "text" },
    ],
    translationFields: [
      {
        key: "langCode",
        label: "Language",
        type: "select",
        placeholder: "Select a language",
        translation: true,
      },
      {
        key: "content",
        label: "Content",
        type: "textarea",
        translation: true,
      },
    ],
  },
  languageskills: {
    baseFields: [
      {
        key: "identifier",
        label: "Language",
        type: "text",
      },
      {
        key: "levelCode",
        label: "Level",
        type: "select",
        placeholder: "Select proficiency level",
      },
    ],
    translationFields: [
      {
        key: "langCode",
        label: "Language of Translation",
        type: "select",
        placeholder: "Select a language",
        translation: true,
      },
      {
        key: "langSkillName",
        label: "Language in which you are skilled",
        type: "text",
        translation: true,
      },
      {
        key: "levelName",
        label: "Level Name",
        type: "text",
      },
    ],
  },
};
