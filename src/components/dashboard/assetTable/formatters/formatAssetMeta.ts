import type { AssetType } from "@/types/assets";

export function formatAssetMeta(assetType: AssetType, asset: any): string {
  switch (assetType) {
    case "education": {
      const range =
        asset?.startYear || asset?.endYear
          ? `${asset?.startYear ?? "?"} - ${asset?.endYear ?? "?"}`
          : "No dates";
      return range;
    }
    case "experience": {
      const start = asset?.startDate
        ? new Date(asset.startDate).getFullYear()
        : null;
      const end = asset?.isCurrent
        ? "Present"
        : asset?.endDate
        ? new Date(asset.endDate).getFullYear()
        : null;
      const range =
        start || end ? `${start ?? "?"} - ${end ?? "?"}` : "No dates";
      return range;
    }
    case "profession":
      return asset?.ownerId ? `Owner: ${asset.ownerId}` : "Profession";
    case "techskills":
      return "Single language";
    case "softskills":
      return asset?.ownerId ? `Owner: ${asset.ownerId}` : "Soft skill";
    case "summaries":
      return "Summary translations";
    default:
      return "";
  }
}
