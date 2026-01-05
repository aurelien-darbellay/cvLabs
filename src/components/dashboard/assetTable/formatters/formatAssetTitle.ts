import type { AssetType } from "@/types/assets";
import { log } from "@/utils/Log";

export function formatAssetTitle(assetType: AssetType, asset: any): string {
  log("formatAssetTitle called", { assetType, asset });
  if (!asset.id) return `New ${assetType}`;
  switch (assetType) {
    case "education":
      return asset?.institution || `Education #${asset?.id ?? "?"}`;
    case "experience":
      return (
        `${asset?.company} ${
          asset.translatedFields && asset.translatedFields[0]
            ? `(${asset?.translatedFields[0]?.jobTitle})`
            : ""
        }` || `Experience #${asset?.id ?? "?"}`
      );
    case "profession":
      return (
        asset?.identifier || asset?.title || `Profession #${asset?.id ?? "?"}`
      );
    case "techskills":
      return asset?.name || `Tech skill #${asset?.id ?? "?"}`;
    case "softskills":
      return (
        asset?.key ||
        asset?.title ||
        asset?.name ||
        `Soft skill #${asset?.id ?? "?"}`
      );
    case "summaries":
      return asset?.shortDescription || `Summary #${asset?.id ?? "?"}`;
    case "languageskills":
      return (
        asset?.identifier.toUpperCase() || `Language skill #${asset?.id ?? "?"}`
      );
    default:
      return `Asset #${asset?.id ?? "?"}`;
  }
}
