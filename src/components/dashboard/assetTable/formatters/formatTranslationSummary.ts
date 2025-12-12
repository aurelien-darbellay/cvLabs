import type { AssetType } from "@/types/assets";

export function formatTranslationSummary(
  assetType: AssetType,
  translation: any
): string {
  switch (assetType) {
    case "education":
    case "profession":
      return translation?.title
        ? `${translation.title}${
            translation.description ? ` — ${translation.description}` : ""
          }`
        : translation?.description || "No details";
    case "experience":
      return translation?.jobTitle
        ? `${translation.jobTitle}${
            translation.description ? ` — ${translation.description}` : ""
          }`
        : translation?.description || "No details";
    case "softskills":
      return translation?.name || translation?.title || "No details";
    case "summaries":
      return translation?.content || "No details";
    case "techskills":
      return translation?.name || "No translations";
    default:
      return "No details";
  }
}
